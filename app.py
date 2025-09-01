import streamlit as st
import os

from extract import log_current_config, copy_log_file


upload_dir = "input_logs"
os.makedirs(upload_dir, exist_ok=True)

st.set_page_config(
    page_title="Input osnmalib log file",
    page_icon="📚",
    layout="wide"
)

st.title("📚 Input osnmalib log file")
st.markdown("""
Upload your android log file.
""")

if "progress_bar" not in st.session_state:
    st.session_state.progress_bar = 0

with st.form("input_log_form"):
    uploaded_file = st.file_uploader(
        "Upload file",
        type="txt",
        help="Ensure file extension  is .txt",
    )

    submit_button = st.form_submit_button("Run", disabled=st.session_state.progress_bar not in [0, 100])

if submit_button:
    if uploaded_file is None:
        st.error("Please select .txt log file")
    else:
        progress_bar = st.progress(1)
        status_text = st.empty()

        try:
            status_text.text("Starting file upload...")
            progress_bar.progress(10)
            file_contents = uploaded_file.getvalue()

            save_path = os.path.join(upload_dir, uploaded_file.name)

            with open(save_path, "wb") as f:
                f.write(file_contents)

            st.success(f"File '{uploaded_file.name}' successfully uploaded to '{upload_dir}'!")

            try:
                status_text.text("Extracting file...")
                try:
                    log_current_config(file_path=f"{upload_dir}/{uploaded_file.name}")
                    copy_log_file()
                except Exception as e:
                    copy_log_file()
                progress_bar.progress(100)
                status_text.text("Extraction complete!")
                st.success(f"New status_log.json successfully generated from uploaded .txt file!")
            except Exception as e:
                progress_bar.progress(100)
                status_text.text("Extract failed!")
                st.error(f"Error: {str(e)}")
                st.exception(e)

        except Exception as e:
            st.error(f"Error uploading file: {str(e)}")
            st.exception(e)

st.markdown("---")

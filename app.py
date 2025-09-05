import streamlit as st
import os

from extract import log_current_config, copy_log_file


upload_dir = "input_logs"
output_log1 = "web/public"
output_log2 = "web-example/public"
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
    st.session_state.progress_bar_json = 0

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

st.markdown("""
Upload your json log file.
""")

with st.form("input_json_form"):
    uploaded_json_file = st.file_uploader(
        "Upload file",
        type="json",
        help="Ensure file extension  is .json",
    )

    submit_json_button = st.form_submit_button("Run", disabled=st.session_state.progress_bar_json not in [0, 100])
    
if submit_json_button:
    if uploaded_json_file is None:
        st.error("Please select .json log file")
    else:
        progress_bar_json = st.progress(1)
        status_text_json = st.empty()

        try:
            status_text_json.text("Starting file upload...")
            progress_bar_json.progress(10)
            file_json_contents = uploaded_json_file.getvalue()

            save_json_path1 = os.path.join(output_log1, "status_log.json")
            save_json_path2 = os.path.join(output_log2, "status_log.json")

            with open(save_json_path1, "wb") as f:
                f.write(file_json_contents)
            with open(save_json_path2, "wb") as f:
                f.write(file_json_contents)

            progress_bar_json.progress(100)
            st.success(f"File '{uploaded_json_file.name}' successfully uploaded to '{output_log1}', '{output_log2}'!")

        except Exception as e:
            st.error(f"Error uploading file: {str(e)}")
            st.exception(e)

st.markdown("---")


import sys
import shutil
sys.path.insert(0, '..')

from pathlib import Path
from osnma.input_formats.input_misc import AndroidGNSSLog
from osnma.receiver.receiver import OSNMAReceiver

output_log1 = "../web/public"
output_log2 = "../web-example/public"

def log_current_config(file_path):
    """
    config_dict contains the default value for the most interesting configuration parameters for a normal user.
    The osnma receiver can also be forced to start at a given GST (WN, TOW) by modifying the start() call. The WN needs
    to be given in the Galileo form (GPS_WN - 1024).
    """
    config_dict = {
        'scenario_path': file_path,
        # Path to the file used as input source. Not used by OSNMAlib but by the input module.
        'exec_path': '.',
        # Path to the folder where to save the generated files (logs and decoded keys)
        'merkle_name': 'OSNMA_MerkleTree.xml',
        # Always needs to be specified. Can be downloaded from the GSC website
        'pubk_name': 'OSNMA_PublicKey_1.xml',
        # Specify for Warm Start mode. Can be downloaded from the GSC website or extracted from a Cold Start run
        'kroot_name': '',
        # Specify for Hot Start mode. You may run your file with OSNMAlib and then point to the saved kroot text file
        'TL': 30,
        # Synchronization time with respect to the GST the receiver is capable of guarantee at all time
        'do_mack_partial_extraction': True,
        # Extract all information possible from a partially received mack message in a sub-frame
        'do_tesla_key_regen': True,
        # Regenerate TESLA keys from partially received keys in a sub-frame
        'do_reed_solomon_recovery': True,
        # Exploit word types 17-20 to recover word types 1-4, which are used for the ADKD0 authentication
        'do_cop_link_optimization': False,
        # To fully benefit from the COP link optimization the TL value should be lower than 30s, best case with 17s
        'do_dual_frequency': False,
        # Will only be useful if the input module sends I/NAV pages from the Galileo E5b-I signal
        'stop_at_faf': False,
        # Stops at First Authenticated Fix, returns the TTFAF, start GST, and last GST
    }

    # input_module = SBF(config_dict['scenario_path'])
    input_module = AndroidGNSSLog(config_dict["scenario_path"])
    osnma_r = OSNMAReceiver(input_module, config_dict)

    osnma_r.start()
    # osnma_r.start(start_at_gst=(1273,218011))

def copy_log_file():
    directories = sorted([d for d in Path('.').iterdir() if d.is_dir() and d.name.startswith("logs_")])
    if not directories:
        print("No directories starting with 'logs_' found.")
        exit()
    last_directory_created = directories[-1]
    print(f"Copying file from: {last_directory_created}")

    destination_dir1 = Path(output_log1)
    destination_dir1.mkdir(parents=True, exist_ok=True)

    destination_dir2 = Path(output_log2)
    destination_dir2.mkdir(parents=True, exist_ok=True)

    source_file = last_directory_created / "status_log.json"
    destination_file1 = destination_dir1 / "status_log.json"
    destination_file2 = destination_dir2 / "status_log.json"

    try:
        shutil.copy(source_file, destination_file1)
        shutil.copy(source_file, destination_file2)
        print(f"Successfully copied {source_file} to {destination_file1}, {destination_file2}")
    except FileNotFoundError:
        print(f"Error: {source_file} not found.")


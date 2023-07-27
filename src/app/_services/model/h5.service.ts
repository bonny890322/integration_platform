import { Injectable } from '@angular/core';

import { File, Dataset, Filters, Group } from 'jsfive';

enum Access {
  ACC_RDONLY = 0, // Read-only access
  ACC_RDWR = 1,   // Read-write access
  ACC_TRUNC = 2,  // Truncate and create for read/write access
  ACC_CREAT = 3   // Create and open for read/write access
}

@Injectable({
  providedIn: 'root'
})
export class H5Service {

  constructor() { }

  async readH5File(filePath: string): Promise<void> {
    try {
      // Download the HDF5 file as a blob
      const response = await fetch(filePath);
      const blob = await response.blob();

      // Read the HDF5 file from the blob
      await this.readH5Blob(blob);
    } catch (error) {
      console.error('Error reading .h5 file:', error);
    }
  }

  private async readH5Blob(blob: Blob): Promise<void> {
    // try {
    const file = new File(blob, Access.ACC_RDONLY); // Use the correct access mode here

    // Assuming the dataset name you want to read is 'datasetName'
    const datasetName = 'datasetName';

    const dataset = file.openDataset(datasetName);
    const data = dataset.read();

    console.log(data);

    // Close the file when done
    file.close();
    // } catch (error) {
    //   console.error('Error reading .h5 file from blob:', error);
    // }
  }
}

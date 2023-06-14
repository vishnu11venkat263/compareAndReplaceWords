import { Injectable } from '@nestjs/common';
import fs = require('fs');
import * as ExcelJS from 'exceljs';

@Injectable()
export class NotepadService {
  constructor() {}

  async processFiles(
    textFilePath: string,
    excelFilePath: string,
  ): Promise<string> {
    // Read the text file
    let textFileData: string = fs.readFileSync(textFilePath, 'utf8');

    // Load the Excel file
    const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFilePath);

    // Get the first worksheet of the Excel file
    const worksheet: ExcelJS.Worksheet = workbook.worksheets[0];

    // Iterate over the rows of the worksheet
    worksheet.eachRow((row, rowNumber) => {
      // Get the value from column 1
      const column1Value: string = row.getCell(1).value.toString();

      // Get the value from column 2
      const column2Value: string = row.getCell(2).value.toString();

      // Replace the words in the text file if a match is found
      textFileData = textFileData.replace(column1Value, column2Value);
    });

    // Return the modified text file data
    return textFileData;
  }

  async compare(textFilePath: string, filePath: string) {
    const file1Content: string = fs.readFileSync(textFilePath, 'utf8');
    const file2Content: string = fs.readFileSync(filePath, 'utf8');

    const file1Words = file1Content.split(/\W+/);
    const file2Words = file2Content.split(/\W+/);

    const wordCount: Record<string, number> = {};
    for (const word of file1Words) {
      if (file2Words.includes(word)) {
        if (wordCount[word]) {
          wordCount[word]++;
        } else {
          wordCount[word] = 1;
        }
      }
    }

    return wordCount;
  }
}

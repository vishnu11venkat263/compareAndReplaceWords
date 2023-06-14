import { Controller, Post } from '@nestjs/common';
import { NotepadService } from './notepad.service';

@Controller('notepad')
export class NotepadController {
  constructor(private readonly NotepadService: NotepadService) {}

  @Post('process')
  async processFiles(): Promise<string> {
    const textFilePath: string = 'D:/replace-words/uploads/t8.shakespeare.txt';
    const excelFilePath: string =
      'D:/replace-words/uploads/french_dictionary.xlsx';

    const modifiedTextFileData: string = await this.NotepadService.processFiles(
      textFilePath,
      excelFilePath,
    );

    return modifiedTextFileData;
  }

  @Post('processWords')
  async matchwords(): Promise<string> {
    const textFilePath: string = 'D:/replace-words/uploads/t8.shakespeare.txt';
    const filePath: string = 'D:/replace-words/uploads/find_words.txt';

    const textFileData: any = await this.NotepadService.compare(
      textFilePath,
      filePath,
    );

    return textFileData;
  }
}

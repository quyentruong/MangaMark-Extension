// Function to add object MangaApi to array
// Need to check to make sure that the MangaApi.name is not already in the array
// If not, add the MangaApi to the array
// Limit to 10 objects in the array
// When the array is full, remove the first object in the array

import { MangaApi } from "../types/manga";
import logWithTimestamp from "./logWithTimestamp";

export class MangaApiArrayUtils {
  private static readonly MAX_ARRAY_LENGTH = 100;
  private static mangaApiArray: MangaApi[] = [];

  constructor(mangaApiArray: MangaApi[]) {
    MangaApiArrayUtils.mangaApiArray = mangaApiArray;
  }

  static addObject(mangaApi: MangaApi): void {
    if (!this.isMangaApiAlreadyAdded(mangaApi)) {
      if (this.mangaApiArray.length > this.MAX_ARRAY_LENGTH) {
        logWithTimestamp('cache limit reached');
        this.mangaApiArray.length = this.MAX_ARRAY_LENGTH / 2;
      }
      this.mangaApiArray.unshift(mangaApi);
    }
  }

  private static isMangaApiAlreadyAdded(mangaApi: MangaApi): boolean {
    return this.mangaApiArray.some((item) => item.name === mangaApi.name);
  }

  // Function to find the object in the array based on the name
  static findObjectByName(name: string): MangaApi | undefined {
    return this.mangaApiArray.find((item) => [item.name, item.other_name_1, item.other_name_2, item.other_name_3].some((n) => n?.toLocaleLowerCase().localeCompare(name.toLowerCase()) === 0));
  }

  private static findIndexByName(name: string): number | undefined {
    return this.mangaApiArray.findIndex((item) => [item.name, item.other_name_1, item.other_name_2, item.other_name_3].some((n) => n?.toLocaleLowerCase().localeCompare(name.toLocaleLowerCase()) === 0));
  }

  // Function to update the mangaApiArray with the updated MangaApi.quantity of one object when findObjectByName(one object) is true
  static updateObjectByQuantity(mangaApi: MangaApi): void {
    const existedIndex = this.findIndexByName(mangaApi.name);
    if (existedIndex > -1) {
      this.mangaApiArray[existedIndex] = mangaApi;
    }
  }

  static getmangaApiArray(): MangaApi[] {
    return this.mangaApiArray;
  }

}

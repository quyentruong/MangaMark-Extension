import path from 'path'
import { readFileSync } from 'fs'

export default function extractPatchNotes(__dirname, targetVersion) {
  const changelogText = readFileSync(path.join(__dirname, 'CHANGELOG.md'), 'utf8')

  // Define the target version you want to extract notes for
  // const targetVersion = "0.1.0";

  // Define a regular expression to match version headings and their notes
  const regex =
    /## (\d+\.\d+\.\d+) \[(\d{4}\.\d{2}\.\d{2})\]\n([\s\S]*?)(?=(## \d+\.\d+\.\d+ \[|\z))/g

  let notes = null

  // Use the regular expression to find the target version
  let match
  while ((match = regex.exec(changelogText)) !== null) {
    const version = match[1]
    const notesText = match[3].trim()

    if (version === targetVersion) {
      notes = notesText.split('\n')
      break
    }
  }

  if (notes !== null) {
    // console.log(`Notes for version ${targetVersion}:\n${notes.join('\n')}`);
    return notes.join('<br/>')
  } else {
    console.log(`Version ${targetVersion} not found in the changelog.`)
  }
}

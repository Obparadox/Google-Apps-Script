function addSignatureToDocuments() {
  // Specify the folder containing the documents
  var folder = DriveApp.getFolderById('YOUR_FOLDER_ID');

  // Get all files in the folder
  var files = folder.getFiles();

  // Iterate through each file
  while (files.hasNext()) {
    var file = files.next();

    // Check if the file is a Google Document
    if (file.getMimeType() === 'application/vnd.google-apps.document') {

      try {
        // Access the document
        var doc = DocumentApp.openById(file.getId());

        // Insert signature image at the end of the document
        var imageUrl = 'URL_TO_SIGNATURE_IMAGE';
        var imageBlob = UrlFetchApp
          .fetch(imageUrl)
          .getBlob();
        
        var image = doc.getBody().appendImage(imageBlob);

        // Position the image as needed
        image.setWidth(200).setHeight(60);

      } catch (e) {
        Logger.log('Error processing document: ' + file.getName() + ' - ' + e.toString());
      }
    }
  }
}

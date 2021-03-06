﻿(function(thisObj) {
  var pixels = MeasurementUnits.PIXELS;
  var pw = 1920;
  var ph = 1080;
  var ih = ph / 8;
  var iw = pw / 8;
  var gutter = 5;
  var settings = {
    documentPreferences: {
      pageWidth: pw,
      pageHeight: ph,
      facingPages: false
    },
    viewPreference: {
      horizontalMeasurementUnits: pixels,
      verticalMeasurementUnits: pixels
    }
  };
  var main = function() {
    var doc = app.documents.add(settings);
    var pg = doc.pages[0];
    var folder = Folder.selectDialog('', '*.*', false);
    if (folder === null) {
      return;
    }
    var images = folder.getFiles('*.jpg');
    if (images === null) {
      return;
    }
    $.writeln(images.length);
    var count = 0;

    for (var x = gutter; x < pw; x += iw + gutter) {
      for (var y = gutter; y < ph; y += ih + gutter) {
        if (count < images.length) {
          var frame = pg.rectangles.add({
            geometricBounds: [y, x, y + ih, x + iw]
          });
          frame.place((images[count]));
          frame.fit(FitOptions.PROPORTIONALLY);
          // frame.fit(FitOptions.FRAME_TO_CONTENT);
          frame.strokeColor = doc.swatches[0];
        }
        count++;
      }
    }

  };
  main();
}(this));

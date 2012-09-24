goog.require('goog.testing.jsunit');
goog.require('ol.TileCoord');
goog.require('ol.TileUrlFunction');


function testCreateFromTemplate() {
  var tileUrl = ol.TileUrlFunction.createFromTemplate('{z}/{x}/{y}');
  assertEquals('3/2/1', tileUrl(new ol.TileCoord(3, 2, 1)));
  assertUndefined(tileUrl(null));
}


function testWithTileCoordTransform() {
  var tileUrl = ol.TileUrlFunction.withTileCoordTransform(
      function(tileCoord) {
        return new ol.TileCoord(tileCoord.z, tileCoord.x, -tileCoord.y);
      },
      ol.TileUrlFunction.createFromTemplate('{z}/{x}/{y}'));
  assertEquals('3/2/1', tileUrl(new ol.TileCoord(3, 2, -1)));
  assertUndefined(tileUrl(null));
}


function testCreateFromTileUrlFunctions() {
  var tileUrl = ol.TileUrlFunction.createFromTileUrlFunctions([
    ol.TileUrlFunction.createFromTemplate('a'),
    ol.TileUrlFunction.createFromTemplate('b')
  ]);
  var tileUrl1 = tileUrl(new ol.TileCoord(1, 0, 0));
  var tileUrl2 = tileUrl(new ol.TileCoord(1, 0, 1));
  assertTrue(tileUrl1 != tileUrl2);
  assertUndefined(tileUrl(null));
}
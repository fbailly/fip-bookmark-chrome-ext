// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

document.addEventListener('DOMContentLoaded', function () {
      document.getElementById('disp').addEventListener('click', display); 
      document.getElementById('add').addEventListener('click', save);            
});


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}






function save() {
    var httpRaw=httpGet("http://www.fipradio.fr/sites/default/files/import_si/si_titre_antenne/FIP_player_current.json")
    var json = JSON.parse(httpRaw);
    var album= json.current.song.titreAlbum
    var titre = json.current.song.titre
    var artiste = json.current.song.interpreteMorceau
    var annee = json.current.song.anneeEditionMusique
    chrome.storage.sync.get('pl', function(result) 
    {
        var playlist = result.pl
        playlist=playlist+"\n"+artiste+"__"+ titre+"__"+album+"__"+annee
        chrome.storage.sync.set({'pl' : playlist}, function() {});
    });
    alert("ajoute!")
}

function display() {
    
    
    chrome.tabs.create({url: "display.html"});
    
    
    var httpRaw=httpGet("http://www.fipradio.fr/sites/default/files/import_si/si_titre_antenne/FIP_player_current.json")
    var json = JSON.parse(httpRaw);
    var album= json.current.song.titreAlbum
    var titre = json.current.song.titre
    var artiste = json.current.song.interpreteMorceau
    var annee = json.current.song.anneeEditionMusique
    chrome.storage.sync.get('pl', function(result) 
    {
        var playlist = result.pl
        alert("playlist="+playlist)
    });
}

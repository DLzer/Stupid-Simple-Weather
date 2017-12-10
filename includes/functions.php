<?php

$apikey = '9dec8582b507efb5';

function zip_search($zip) {

    if(isset($_GET['zip-submit'])) {
        if(isset($_GET['zip-search'])) {
            $zip = $_GET['zip-search'];

            $ch = curl_init("http://api.wunderground.com/api/9dec8582b507efb5/geolookup/q/$zip.json");
            curl_exec($ch);
            curl_close($ch);
            echo $ch;
            
        }
    }
}
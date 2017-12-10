<!doctype html>
<html lang="en">
    <head>
        <title>Simple Weather</title>
        <link href="assets/css/style.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script> 
    </head>
    <body>

        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1 id="site-title">Stupid Simple Weather</h1>
                </div>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-md-6">
                    <div class="warning">
                    </div>
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" id="zip-search" name="zip-search" aria-describedby="zipHelp" placeholder="Enter ZIP Code">
                            <small id="zipHelp" class="form-text text-muted">ex. 10940</small>
                        </div>
                        <button id="zip-submit" type="submit" name="zip-submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row title-row">
                <div class="col-md-12 weather-title">
                </div>
            </div>
            <div class="row weather-row">
            </div>
        </div>

        <script type="text/javascript" src="assets/js/weather.js"></script>
    </body>
</html>
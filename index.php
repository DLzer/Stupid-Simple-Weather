<!doctype html>
<html lang="en">
    <head>
        <title>Simple Weather</title>
        <link href="assets/css/style.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script> 
        <script src="https://use.fontawesome.com/a839cd93dd.js"></script>
    </head>
    <body>

    
    <div class="wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 navigation-col">

                    <nav class="navbar navbar-light justify-content-between">
                        <a class="navbar-brand" href="/">Stupid Simple Weather <i class="fa fa-cloud" aria-hidden="true"></i></a>
                        <a class="nav-item nav-link" href="about.php">About</a>
                        <form class="form-inline">
                            <input class="form-control mr-sm-2" id="zip-search" type="search" placeholder="ex. 10940" aria-label="Search">
                            <button id="zip-submit" class="btn btn-outline-success my-2 my-sm-0" name="zip-submit" type="submit">Search</button>
                        </form>
                    </nav>
                    
                </div>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-md-6">
                    <div class="warning">
                    </div>
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

        <div class="push"></div>
    </div>

        <footer class="footer">
            <div class="container">
                <span class="text-muted footer-text">API Data courtesy of </span><span><img src="assets/images/wulogo.png" height="30px"/></span>
            </div>
        </footer>


        <script type="text/javascript" src="assets/js/js.cookie.js"></script>
        <script type="text/javascript" src="assets/js/weather.js"></script>
    </body>
</html>
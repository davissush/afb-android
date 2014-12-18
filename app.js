window.addEventListener('load', function () {
        new FastClick(document.body);
}, false);

document.addEventListener("backbutton", function(e){
        var pagecode = $(this).data('pagecode');

        if(pagecode != 'question1'){
                $('.featherlight-close-icon.featherlight-close').trigger('click');
                $('.featherlight-image .featherlight-image-close-icon').trigger('click');
//                navigator.app.backHistory();
        }

}, false);

var slider = new PageSlider($("#container"));
var spinner = $("#spinner");

spinner.hide();

$(window).on('hashchange', route);

$('.back-button').entwine({
        onclick: function(e){
                e.preventDefault();
                var pagecode = $(this).data('pagecode');

                if(pagecode != 'question1'){
                        $('.featherlight-close-icon.featherlight-close').trigger('click');
                        $('.featherlight-image .featherlight-image-close-icon').trigger('click');
                        parent.history.back();
                }
        }
});

function renderpage(page){
        $.ajax({
                type: 'GET',
                url: 'pages/' + page + '.html',
                dataType: 'html',
                complete: function(){
                },
                success: function(data){
                        spinner.hide();
                        slider.slidePage($(data));
                }
        });
}

// Basic page routing
function route(event) {
        var hash = window.location.hash;
        var loadpage = hash.substring(1);

        spinner.hide();
        spinner.show();

        if(loadpage == ""){
                window.localStorage.setItem("q1", 0);
                window.localStorage.setItem("q2", 0);
                window.localStorage.setItem("q3", 0);
                window.localStorage.setItem("q4", 0);
                renderpage('home');
        } else {
               renderpage(loadpage);
        }

}

route();

(function($) {

        var IsLoading = false;

        $('mathys').entwine(function($){

                $('*').entwine({
                        showAlert: function (message, title) {
                                if (navigator.notification) {
                                        navigator.notification.alert(message, null, title, 'OK');
                                } else {
                                        alert(title ? (title + ": " + message) : message);
                                }
                        },
                        initScores: function(){
                                window.localStorage.setItem("q1", 0);
                                window.localStorage.setItem("q2", 0);
                                window.localStorage.setItem("q3", 0);
                                window.localStorage.setItem("q4", 0);

                                window.localStorage.setItem("q1s", 0);
                                window.localStorage.setItem("q2s", 0);
                                window.localStorage.setItem("q3s", 0);
                                window.localStorage.setItem("q4s", 0);
                        },
                        totalScore: function(){
                                var total = parseInt(window.localStorage.getItem("q1")) + parseInt(window.localStorage.getItem("q2")) + parseInt(window.localStorage.getItem("q3")) + parseInt(window.localStorage.getItem("q4"));

                                return total;
                        }
                });

                $('.start-diagnosis').entwine({
                        onclick: function(){
                                window.localStorage.setItem("q1", 0);
                                window.localStorage.setItem("q2", 0);
                                window.localStorage.setItem("q3", 0);
                                window.localStorage.setItem("q4", 0);
                        }
                });

                $('.question-image').entwine({
                        onclick: function(){
                               var imgfile = $(this).data('imgfile');

                               var popupImage = "<div>" +
                                       "<div class='finner' id='img-popup'>" +
                                       "   <img src='img/" + imgfile + "'>" +
                                       "</div>" +
                                       "</div>";


                                $.featherlight(popupImage, {
                                        namespace: 'featherlight-image',
                                        closeOnClick: false
                                });

                                $('.featherlight-image-content').append("<div class='fcontrol'><span class='magnify plus'>+</span> <span class='magnify minus'>-</span></div>");
                        }
                });


                $('.featherlight-image').entwine({
                        onadd: function(){
//                                var myElement = document.getElementById('img-popup');
//
//                                var hammertime = new Hammer(myElement);
//
//                                hammertime.get('pinch').set({ enable: true });
//
//                                hammertime.on('pinchin', function(ev) {
//                                        //var imgwidth = this.closest('.featherlight-image-content').find('.featherlight-image-inner img').width();
//                                        var imgwidth = $('#img-popup').find('img').width();
//                                        imgwidth-=20;
//
//                                        $('#img-popup').find('img').width(imgwidth);
//                                });
//
//                                hammertime.on('pan', function(ev) {
//
//                                });
//
//                                hammertime.on('pinchout', function(ev) {
//                                        //var imgwidth = this.closest('.featherlight-image-content').find('.featherlight-image-inner img').width();
//                                        var imgwidth = $('#img-popup').find('img').width();
//                                        imgwidth+=20;
//
//                                        $('#img-popup').find('img').width(imgwidth);
//                                });
                        }
                });


                $('.magnify.plus').entwine({
                        onclick: function(e){
                                e.preventDefault();
                               var imgwidth = this.closest('.featherlight-image-content').find('.featherlight-image-inner img').width();
                               imgwidth+=20;

                               this.closest('.featherlight-image-content').find('.featherlight-image-inner img').width(imgwidth);

                               this.blur();

                               return false;
                        }
                });

                $('.magnify2.plus').entwine({
                        onclick: function(e){
                                e.preventDefault();
                                var imgwidth = this.closest('.QImage').find('img').width();
                                imgwidth+=20;

                                this.closest('.QImage').find('img').width(imgwidth);

                                this.blur();

                                return false;
                        }
                });

                $('.magnify.minus').entwine({
                        onclick: function(e){
                                var imgwidth = this.closest('.featherlight-image-content').find('.featherlight-image-inner img').width();
                                imgwidth-=20;

                                this.closest('.featherlight-image-content').find('.featherlight-image-inner img').width(imgwidth);

                                this.blur();

                                return false;
                        }
                });

                $('.magnify2.minus').entwine({
                        onclick: function(e){
                                e.preventDefault();
                                var imgwidth = this.closest('.QImage').find('img').width();
                                imgwidth-=20;

                                this.closest('.QImage').find('img').width(imgwidth);

                                this.blur();

                                return false;
                        }
                });

                $(".popup-action.left").entwine({
                        onclick: function(){
                                $('.featherlight-content .popup-container').css('font-size', '1.6em');
                        }
                });

                $(".popup-action.right").entwine({
                        onclick: function(){
                                $('.featherlight-content .popup-container').css('font-size', '1em');
                        }
                });

//                $(".magnify.plus").on("touchend", function(){ return false; });
//                $(".magnify.minus").on("touchend", function(){ return false; });

                $('.result-section').entwine({
                        onadd: function(){
                                var self = this;

                                var totalscore = self.totalScore();
                                var score_response = "";
                                var score_message = "";
                                var score_image = "";

                                if(parseInt(totalscore)  >= 30){
                                        score_response = "<span class='negative-stats'>Very likely</span> to have an AFB infection";
                                        score_message = "<p>In this case it is recommended that you burn the hive and report the outbreak.<br/> Instructions on how to do this can be found on the AFB Management Agency website.</p>";
                                        score_message += "<span><a href='#' class='open-browser'>www.bee.crowna.co.nz</a></span>";
                                        score_image += "<img src='img/negative_result.png'>";
                                } else {
                                        score_response = "<span class='positive-stats'>Unlikely</span> to have AFB";
                                        score_message =  "<p><strong>You now have a number of options available to you. You could:</strong></p>";
                                        score_message += "<ul>";
                                        score_message += "<li>Do nothing (not recommended unless you know what has caused the symptoms you observed).</li>";
                                        score_message += "<li>You could send samples away for further analysis (see the AFB website below for instructions on how to do this). <span class='block-type'><a href='#' class='open-browser'>www.bee.crowna.co.nz</a></span></li>";
                                        score_message += "<li>You could step up the frequency of your AFB checks.</li>";
                                        score_message += "<li>You could ask for assistance in checking your hives from an experienced beekeeper.</li>";
                                        score_message += "<li>You could quarantine the hives and associated equipment for up to 18 months to ensure that an infection is not present at a “subclinical” level.</li>";
                                        score_message += "<li>You could introduce a management plan that incorporates one or more of the suggestions above.</li>";
                                        score_message += "</ul>";
                                        score_image += "<img src='img/positive_result.png'>";
                                }

                                self.find(".result-text").html(score_response);
                                self.find(".result-description").html(score_message);
                                self.find(".result-image").html(score_image);

                        }
                });


                $('.open-browser').entwine({
                        onclick: function(e){
                                e.preventDefault();

                                window.open('http://www.bee.crowna.co.nz', '_system');
                        }
                });


                $('.yes').entwine({
                        onclick: function(){
                                var qcode = $(this).closest('.answer-box').data('questioncode');

                                switch(qcode){
                                        case 1:
                                                window.localStorage.setItem("q1", 10);
                                                window.localStorage.setItem("q1s", 1);
                                                break;
                                        case 2:
                                                window.localStorage.setItem("q2", 10);
                                                window.localStorage.setItem("q2s", 1);
                                                break;
                                        case 3:
                                                window.localStorage.setItem("q3", 20);
                                                window.localStorage.setItem("q3s", 1);
                                                break;
                                        case 4:
                                                window.localStorage.setItem("q4", 40);
                                                window.localStorage.setItem("q4s", 1);
                                                break;
                                }
                        }
                });

                $('.no').entwine({
                        onclick: function(){
                                var qcode = $(this).closest('.answer-box').data('questioncode');

                                switch(qcode){
                                        case 1:
                                                window.localStorage.setItem("q1", 0);
                                                window.localStorage.setItem("q1s", 2);
                                                break;
                                        case 2:
                                                window.localStorage.setItem("q2", 0);
                                                window.localStorage.setItem("q2s", 2);
                                                break;
                                        case 3:
                                                window.localStorage.setItem("q3", 0);
                                                window.localStorage.setItem("q3s", 2);
                                                break;
                                        case 4:
                                                window.localStorage.setItem("q4", 0);
                                                window.localStorage.setItem("q4s", 2);
                                                break;
                                }
                        }
                });

                $('.restart').entwine({
                        onclick: function(){
                                var self = this;

                                self.initScores();
                        }
                });


                $('.show-popup').entwine({
                        onclick: function(e){
                                e.preventDefault();

                                var popupContent = "<div>" +
                                        "  <div class='popup-title'>About Us  <a href='#' class='custom-close-icon'>✕</a></div>" +
                                        "  <div class='popup-container'>" +
                                        "<p>This application was funded by the Management Agency, American Foulbrood National Pest Management Paln, to assist New Zealand beekeepers in the eradication of American Foulbrood.</p>" +
                                        "<p>The Application was created for the Management Agency by Brice Horner (BSc), Apiculture Tutor, Otago.</p>" +
                                        "<p>Photos were generously provided by Frank Lindsay (Lindsay's Apiaries) and Brice Horner.</p>" +
                                        "<p>Rex Baynes<br/>(Manager AFB, NPMP)</p>" +
                                        "<div class='PopFooter'>Supported by Sush Mobile</div>" +
                                        "</div>" +
                                        "</div>";

                                $.featherlight(popupContent, {
                                        closeOnClick: false
                                });
                        }
                });

                $('.custom-close-icon').entwine({
                        onclick: function(e){
                                e.preventDefault();
                                $('.featherlight-close-icon.featherlight-close').trigger('click');
                        }
                });

                $('.answer-box').entwine({
                        onadd: function(){
                                self = this;

                                var qid = $(this).data('questioncode');

                                var gidindx = "q"+qid+"s";

                                var answer = window.localStorage.getItem(gidindx);

                                if(answer == 1){
                                        self.find('.no-answer').removeClass('chosen');
                                        self.find('.yes-answer').addClass('chosen');
                                }

                                if(answer == 2){
                                        self.find('.no-answer').addClass('chosen');
                                        self.find('.yes-answer').removeClass('chosen');
                                }

                                if(answer == 0){
                                        self.find('.no-answer').removeClass('chosen');
                                        self.find('.yes-answer').removeClass('chosen');
                                }

                        }
                });

                $('.question-info').entwine({
                        onclick: function(e){
                                e.preventDefault();

                                var self = this;

                                var infonum = $(this).data('questionnum');

                                var info1 = "<div>" +
                                        "  <div class='popup-title'>Instructions  <a href='#' class='custom-close-icon'>✕</a></div>" +
                                        "  <div class='popup-container'>" +
                                        "    <ol>" +
                                        "       <li>Remove frames containing brood from the brood box one at a time.</li>" +
                                        "       <li>Give the frames a short sharp shake, while holding them over the box they came out of.  This will remove the adhering bees and ensure the bees go back into the same box they came from.</li>" +
                                        "       <li>Once the frame is free of bees, inspect each capped cell to ensure;" +
                                        "            <ol class='inner-ol'>" +
                                        "               <li>There is a solid laying pattern (as opposed to a “spotty” pattern).</li>" +
                                        "               <li>The capping colour is not overly dark and is the same or very similar to that of the capping of cells immediately around it.</li>" +
                                        "               <li>That the texture of the cappings is more “fluffy” than greasy.</li>" +
                                        "               <li>That there are not irregular perforations or holes in the cappings.</li>" +
                                        "               <li>That the cell cappings are flat or domed and not sunken.</li>" +
                                        "            </ol>" +
                                        "       </li>" +
                                        "       <li>If any cell displays one or more of the above symptoms, it should uncapped and the larva exposed.</li>" +
                                        "       <li>The cap can easily be removed by scraping it away with your hive tool or a dry grass stalk.</li>" +
                                        "       <li>Once exposed the larva needs to be closely examined (return to the main App for instructions on how to do this and what to look for).</li>" +
                                        "    </ol>" +
                                        "    <div class='PopFooter'></div>" +
                                        "  </div>" +
                                        "  <div class='popup-actions'>" +
                                        "     <div class='popup-action left'>+" +
                                        "     </div>" +
                                        "     <div class='popup-action right'>-" +
                                        "     </div>" +
                                        "  </div>" +
                                        "</div>";


                                var info2 = "<div>" +
                                        "  <div class='popup-title'>Instructions  <a href='#' class='custom-close-icon'>✕</a></div>" +
                                        "  <div class='popup-container'>" +
                                        "  <ol>" +
                                        "     <li>Uncap any suspect cells.</li>" +
                                        "     <li>Hold the frame by the lugs at either end of the top bar and turn it upside down.</li>" +
                                        "     <li>Position the sun or a source of artificial light behind you so that it shines into the cells.</li>" +
                                        "     <li>Manipulate the frame up and down so that you can clearly see the base or the content, of the cells.</li>" +
                                        "     <li>If any cell has failed to hatch, while the others around it have, it should be uncapped and the larva exposed.</li>" +
                                        "     <li>The cap can easily be removed by scraping it away with your hive tool or a dry grass stalk.</li>" +
                                        "     <li>Once exposed the larva needs to be closely examined (return to the main App for instructions on how to do this and what to look for).</li>" +
                                        "     <li>Closely examine any larva that appears to have died and “collapsed” on to the bottom wall of the cell.  Dead larva can range from white to coffee brown in colour.</li>" +
                                        "  </ol>" +
                                        "  <div class='PopFooter'></div>" +
                                        "</div>" +
                                        "  <div class='popup-actions'>" +
                                        "     <div class='popup-action left'>+" +
                                        "     </div>" +
                                        "     <div class='popup-action right'>-" +
                                        "     </div>" +
                                        "  </div>" +
                                        "</div>";


                                var info3 = "<div>" +
                                        "  <div class='popup-title'>Instructions  <a href='#' class='custom-close-icon'>✕</a></div>" +
                                        "  <div class='popup-container'>" +
                                        "  <ol>" +
                                        "     <li>Uncap any suspect cells.</li>" +
                                        "     <li>Use a dry stick or matchstick ensuring, that the selected item has a ruff surface.</li>" +
                                        "     <li>Insert the stick or matchstick into the suspect pupae and stir the body tissue so that it clings to whatever you are using.</li>" +
                                        "     <li>Slowly withdraw your stick or matchstick and observe how far the pupae body tissue stretches or “ropes” out.</li>" +
                                        "     <li>If the tissue roped out between 10-30mm then the test was positive.</li>" +
                                        "     <li>The body tissue of AFB infected larva often “ropes out” then “snaps back”.</li>" +
                                        "  </ol>" +
                                        "  <div class='PopFooter'></div>" +
                                        "</div>" +
                                        "  <div class='popup-actions'>" +
                                        "     <div class='popup-action left'>+" +
                                        "     </div>" +
                                        "     <div class='popup-action right'>-" +
                                        "     </div>" +
                                        "  </div>" +
                                        "</div>";

                                var info4 = "<div>" +
                                        "  <div class='popup-title'>Instructions  <a href='#' class='custom-close-icon'>✕</a></div>" +
                                        "  <div class='popup-container'>" +
                                        "  <ol>" +
                                        "     <li>Uncap any suspect cells.</li>" +
                                        "     <li>Hold the frame by the lugs at either end of the top bar and turn it upside down.</li>" +
                                        "     <li>Position the sun or a source of artificial light behind you so that it shines into the cells.</li>" +
                                        "     <li>Manipulate the frame up and down so that you can clearly see the base or the content, of the cells.</li>" +
                                        "     <li>Search the lower walls of the cells for a distinctive curved shape which resembles the rounded end of a bullet and is identical to the head end of a sunken, moist, diseased larva and pupae.</li>" +
                                        "     <li>Look for the thin hair like structure that is the remains of the tongue in pupal scale.</li>" +
                                        "     <li>The red stick in the photo below is inserted in a cell and shows the correct angle between eye and frame.</li>" +
                                        "  </ol>" +
                                        "  <div class='QImage'>" +
                                        "     <img src='img/q4image.png'>" +
                                        "     <img src='img/q4image_zoomed.png'>" +
                                        "  </div>" +
                                        "  <div class='PopFooter'></div>" +
                                        "</div>" +
                                        "  <div class='popup-actions'>" +
                                        "     <div class='popup-action left'>+" +
                                        "     </div>" +
                                        "     <div class='popup-action right'>-" +
                                        "     </div>" +
                                        "  </div>" +
                                        "</div>";

                                switch(infonum){
                                        case 1:
                                                $.featherlight(info1, {
                                                        closeOnClick: false
                                                });
                                                break;
                                        case 2:
                                                $.featherlight(info2, {
                                                        closeOnClick: false
                                                });
                                                break;
                                        case 3:
                                                $.featherlight(info3, {
                                                        closeOnClick: false
                                                });
                                                break;
                                        case 4:
                                                $.featherlight(info4, {
                                                        closeOnClick: false
                                                });
                                                break;
                                }

                        }
                });

        });

})(jQuery);
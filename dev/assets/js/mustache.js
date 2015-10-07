//This is just a minor example of mustache js. I didn't find it necessary here because I used Angular js

        
    //Fill the footer
    
    var footerData={developedBy: "Developed by Marko Reljic"};
    

    var footerText = "<p>{{developedBy}}</p>";
    var htmlFooter = Mustache.to_html(footerText, footerData);
    $('.footer').html(htmlFooter);
    
    

//IIFE goes here

(function(){
    function Start()
    {
        console.log("App Started...");

        let removeButtons = document.querySelectorAll('.btn-danger');
        for(button of removeButtons)
        {
            button.addEventListener('click',(event) => {
                if(!confirm("Are you sure?"))
                {
                    event.preventDefault();
                    window.location.assign('/contact-list');
                }
            });
        }
    }

    window.addEventListener("load",Start);

})();
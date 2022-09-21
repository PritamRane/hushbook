src="https://formspree.io/js/formbutton-v1.min.js" 

  /* paste this line in verbatim */
  window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};
  /* customize formbutton below*/     
  formbutton("create", {
    action: "https://formspree.io/f/mgeqagol",
    title: "Request A Book",
    fields: [
      { 
        type: "email", 
        label: "Email:", 
        name: "email",
        required: true,
        placeholder: "your@email.com"
      },
      {
        type: "textarea",
        label: "Book Name:",
        name: "message",
        placeholder: "Ex. 1984",
      },
      { type: "submit" }      
    ],
    styles: {
      title: {
        backgroundColor: "black"
      },
      button: {
        backgroundColor: "black"
      }
    }
  });

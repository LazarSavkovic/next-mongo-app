export function loginValidate(values){
    const errors = {};

    if (!values.email) {
        errors.email = 'E-mail je obavezno polje';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'E-mail adresa nije validna';
      }


      if(!values.password){
        errors.password = 'Šifra je obavezno polje';
      } else if(values.password.length < 8 || values.password.length > 20){
        errors.password = 'Dužina šifre mora biti između 8 i 20 karaktera';
      } else if(values.password.includes(' ')) {
        errors.password = 'Šifra nije validna';
      }

      return errors;
}

export function registerValidate(values){
    const errors = {};

    if(!values.username){
        errors.username = 'Korisnicko ime je obavezno polje';
    } else if(values.username.includes(' ')) {
        errors.username = 'Korisnicko ime nije validno'
    }

    if (!values.email) {
        errors.email = 'E-mail je obavezno polje';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'E-mail adresa nije validna';
      }


      if(!values.password){
        errors.password = 'Šifra je obavezno polje';
      } else if(values.password.length < 8 || values.password.length > 20){
        errors.password = 'Dužina šifre mora biti između 8 i 20 karaktera';
      } else if(values.password.includes(' ')) {
        errors.password = 'Šifra nije validna';
      }

      if(!values.cpassword){
        errors.cpassword = 'Šifra je obavezno polje';
      } else if(values.password !== values.cpassword){
        errors.cpassword = 'Sifre nisu iste';
      } else if(values.password.includes(' ')) {
        errors.cpassword = 'Šifra nije validna';
      }

      return errors;
}
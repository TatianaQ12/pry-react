export const formatRut = (rut) => {
   const cleanedRut = rut.replace(/[^0-9kK]/g, ''); // Elimina caracteres no válidos
   const rutDigits = cleanedRut.slice(0, -1);
   const verifierDigit = cleanedRut.slice(-1);

   let formattedRut = '';
   let count = 0;

   // Agrega puntos al RUT
   for (let i = rutDigits.length - 1; i >= 0; i--) {
     formattedRut = rutDigits.charAt(i) + formattedRut;
     count++;
     if (count === 3 && i !== 0) {
       formattedRut = '.' + formattedRut;
       count = 0;
     }
   }

   // Agrega guion y dígito verificador
   formattedRut = `${formattedRut}-${verifierDigit}`;

   return formattedRut;
 };

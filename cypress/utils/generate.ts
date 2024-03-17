class Generate {
    generateEmail(emailLength=8, domainLength=3) {
       return `${this.generateRandomName(emailLength)}@${this.generateRandomName(domainLength)}.com`
    }

   generateRandomName(length: any) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
    generateRandoPhoneNumber() {
        const randomNumber = Math.floor(Math.random() * 9000000000) + 8000000000;
        return `8${randomNumber.toString().slice(0, 9)}`;
     }
}


const GenerateUtils = new Generate()
export default GenerateUtils
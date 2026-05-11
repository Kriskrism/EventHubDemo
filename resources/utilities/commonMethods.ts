export class commonMethods {

//returns today's date in the format "10 Apr 2026"
    async getTodaysDate(){
        const today = new Date();

        const formattedDate = today.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        });

        console.log(formattedDate); // 10 Apr 2026
            }
}
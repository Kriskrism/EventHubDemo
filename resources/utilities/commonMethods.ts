export class commonMethods {

//returns today's date in the format "10 Apr 2026"
    async getTodaysDate(): Promise<string> {
        const today = new Date();

        const formattedDate = today.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        });

        return formattedDate; // 10 Apr 2026
    }
}
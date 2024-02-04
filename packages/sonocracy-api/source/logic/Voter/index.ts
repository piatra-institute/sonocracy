class Voter {
    constructor() {
        setInterval(() => {
            // console.log('Voter is running');
        }, 45_000);
    }

    async vote() {
        return true;
    }
}


const voter = new Voter();


export default voter;

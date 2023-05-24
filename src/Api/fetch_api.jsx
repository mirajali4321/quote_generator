const fetch_api = async() => {
        try {
            const response = await fetch('https://type.fit/api/quotes');
            const data = await response.json();
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomQuote = data[randomIndex];
            return randomQuote
        } catch (error) {
            console.error('Error fetching magic quote:', error);
            throw error;
        }
    };
export default fetch_api

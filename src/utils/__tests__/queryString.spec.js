const { queryString, queryStringToObject } = require('../queryString');

describe('Object to query String', () => {
    it('Should create a valid query string when an object is passed', () => { 
        const obj = {
            name: "Tiago",
            age: "28",
            country: "Brazil"
        }
        expect(queryString(obj)).toBe("?name=Tiago&age=28&country=Brazil")
    })

    it('Should create a valid query string when the object passed contains more than one value', () => { 
         const obj = {
            name: "Tiago",
            age: "28",
            country: "Brazil",
            sports: ['crossfit', 'taekwondo']
         }
        expect(queryString(obj)).toBe("?name=Tiago&age=28&country=Brazil&sports=crossfit,taekwondo")
    });

    it('Should create a valid query string when the object contains empty values or undefined', () => { 
           const obj = {
            name: "Tiago",
            age: "28",
            country: "Brazil",
            sports: ['crossfit', 'taekwondo'],
            instruments: "",
            politicalParty: undefined,
            internationalTrips: [],
           }
        expect(queryString(obj)).toBe("?name=Tiago&age=28&country=Brazil&sports=crossfit,taekwondo&instruments=&politicalParty=&internationalTrips=")
    });

    it('Should create a valid query string scaping special characters', () => { 
        const obj = {
            name: "Tiago",
            age: "28",
            country: "Brazil",
            birthDate: "15/12/1990",
            sports: ['crossfit', 'taekwondo'],
            instruments: "",
            politicalParty: undefined,
            internationalTrips: [],
        }
        expect(queryString(obj)).toBe("?name=Tiago&age=28&country=Brazil&birthDate=15%2F12%2F1990&sports=crossfit,taekwondo&instruments=&politicalParty=&internationalTrips=")
    });

    it('Should throw an error when the object contains nested objects', () => { 
        const obj = {
           name: "Tiago",
            age: "28",
            country: "Brazil",
            birthDate: "15/12/1990",
            sports: {
                crossfit: "beginner",
                taekwondo: "advanced"
            },
            instruments: "",
            politicalParty: undefined,
            internationalTrips: [],
        }
        expect(() => queryString(obj)).toThrowError("Objects are not allowed in the query string")
    });
});

describe('Query String to Object', () => { 
    it('Should create a valid object when a query string is passed', () => { 
        const query = "?name=Tiago&age=28&country=Brazil"
        expect(queryStringToObject(query)).toEqual({
            name: "Tiago",
            age: "28",
            country: "Brazil"
        })
    })

    it('Should create a valid object when the query string passed contains more than one value', () => { 
        const query = "?name=Tiago&age=28&country=Brazil&sports=crossfit,taekwondo"
        expect(queryStringToObject(query)).toEqual({
            name: "Tiago",
            age: "28",
            country: "Brazil",
            sports: ['crossfit', 'taekwondo']
        })
    });

    it('Should create a valid object when the query string contains empty values or undefined', () => {
        const query = "?name=Tiago&age=28&country=Brazil&sports=crossfit,taekwondo&instruments=&politicalParty=&internationalTrips="
        expect(queryStringToObject(query)).toEqual({
            name: "Tiago",
            age: "28",
            country: "Brazil",
            sports: ['crossfit', 'taekwondo'],
            instruments: undefined,
            politicalParty: undefined,
            internationalTrips: undefined,
        })
    });

    it('Should create a valid object when the query string contains special characters', () => { 
        const query = "?name=Tiago&age=28&country=Brazil&birthDate=15%2F12%2F1990&sports=crossfit,taekwondo&instruments=&politicalParty=&internationalTrips="
        expect(queryStringToObject(query)).toEqual({
            name: "Tiago",
            age: "28",
            country: "Brazil",
            birthDate: "15/12/1990",
            sports: ['crossfit', 'taekwondo'],
            instruments: undefined,
            politicalParty: undefined,
            internationalTrips: undefined,
        })
    });

    it('Should throw an error when the query string is invalid', () => {

        let invalidQueries = [
            "",
            undefined,
            "name=Tiago",
            "age=28=&country=Brazil",
            "?name=Tiago&age=28&country=Brazil&sports=crossfit,taekwondo&instruments=&politicalParty=&internationalTrips=&invalid=invalid&"
        ]

        invalidQueries.forEach(query => {
            expect(() => queryStringToObject(query)).toThrowError("Invalid query string")
        })
    });
});
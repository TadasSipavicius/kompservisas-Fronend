export const allOrders = [
    {
        id: 1,
        name: "SS0001",
        status: "Sukurtas",
        createdTime: "2022-04-10",
        history: [
            {
                time: "2022-04-16 14:55",
                comment: "Uzsakymas sukurtas",
                status: "Sukurtas"
            },
            {
                time: "2022-04-16 18:01",
                comment: "Padaryta diagnostika",
                status: "Taisomas"
            },
            {
                time: "2022-04-17 10:00",
                comment: "Atlikus diagnostika rasta, kad dėl GPU kompiuteris neveikia. Mechaniškai apžiūrėjus GPU buvo rasta, kad guolis susidėvėjęs ir dėl to kyla negražūs garsai. Laukiame guolio prekės ",
                status: "Laukiama dalių"
            },
        ]
    },
    {
        id: 2,
        name: "SS0002",
        status: "Priimtas",
        createdTime: "2022-04-10",
        history: [
            {
                time: "2022-04-16 14:55",
                comment: "Uzsakymas sukurtas",
                status: "Sukurtas"
            },
            {
                time: "2022-04-16 18:01",
                comment: "Padaryta diagnostika",
                status: "Taisomas"
            },
        ]
    },
    {
        id: 3,
        name: "SS0003",
        status: "Sutaisytas",
        createdTime: "2022-04-10",
        history: [
            {
                time: "2022-04-16 14:55",
                comment: "Uzsakymas sukurtas",
                status: "Sukurtas"
            },
            {
                time: "2022-04-16 18:01",
                comment: "Padaryta diagnostika",
                status: "Taisomas"
            },
        ]
    }
]
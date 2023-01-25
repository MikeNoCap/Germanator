export class NounArticles {
    static articleTable = {
        "nominative": {
            "proper": {
                "masculine": "der",
                "feminine": "die",
                "neuter": "das",
                "plural": "die"
            },
            "non-proper": {
                "masculine": "ein",
                "feminine": "eine",
                "neuter": "ein",
                "plural": "keine"
            }
        },
        "accusative": {
            "proper": {
                "masculine": "den",
                "feminine": "die",
                "neuter": "das",
                "plural": "die"
            },
            "non-proper": {
                "masculine": "einen",
                "feminine": "eine",
                "neuter": "ein",
                "plural": "keine"
            }
        },
        "dative": {
            "proper": {
                "masculine": "dem",
                "feminine": "der",
                "neuter": "dem",
                "plural": "den"
            },
            "non-proper": {
                "masculine": "einem",
                "feminine": "einer",
                "neuter": "einem",
                "plural": "keinen"
            }
        },
        "genitive": {
            "proper": {
                "masculine": "des",
                "feminine": "der",
                "neuter": "des",
                "plural": "der"
            },
            "non-proper": {
                "masculine": "eines",
                "feminine": "einer",
                "neuter": "eines",
                "plural": "keiner"
            }
        }
    }
    static article(nounCase, isProper, gender) {
        if (!gender) {
            return
        }
        const proper = isProper ? "proper" : "non-proper"
        return this.articleTable[nounCase.toLowerCase()][proper][gender.toLowerCase()]
    }
}



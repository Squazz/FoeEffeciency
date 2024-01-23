const buildings = [
    { name: 'Majestic Winter Wonderland Pyramid', width: 4, length: 4, needsRoad: false, productions: [ 
            {forgePoints: 19, currentGoods: 48, previousGoods: 0, unrefinedGoods: 0, coins: 0, supplies: 134800, units: 12, redAttack: 37, redDefence: 0, blueAttack: 44, blueDefence: 0, coinBoost: 0, supplyBoost: 0, chance: 1},
        ]
    },
];

function calculateEfficiency() {
    // Get user input values
    const forgePointsInput = parseFloat(document.getElementById('forgePoints').value);
    const currentGoodsInput = parseFloat(document.getElementById('currentGoods').value);
    const previousGoodsInput = parseFloat(document.getElementById('previousGoods').value);
    const unrefinedGoodsInput = parseFloat(document.getElementById('unrefinedGoods').value);
    const coinsInput = parseFloat(document.getElementById('coins').value);
    const suppliesInput = parseFloat(document.getElementById('supplies').value);
    const unitsInput = parseFloat(document.getElementById('units').value);
    const redAttackInput = parseFloat(document.getElementById('redAttack').value);
    const redDefenceInput = parseFloat(document.getElementById('redDefence').value);
    const blueAttackInput = parseFloat(document.getElementById('blueAttack').value);
    const blueDefenceInput = parseFloat(document.getElementById('blueDefence').value);
    const coinBoostInput = (parseFloat(document.getElementById('coinBoost').value) / 100) + 1;
    const supplyBoostInput = (parseFloat(document.getElementById('supplyBoost').value) / 100) + 1;

    // Calculate efficiency for each building
    const efficiencyResults = buildings.map(building => {
        let area = building.width * building.length;

        // If the building needs a road, add half of the width to the area
        if (building.needsRoad) {
            area += building.width / 2;
        }

        // Calculate the total daily production for each kind of production based on chances
        const totalProduction = building.productions.reduce((acc, production) => {
            if (production.forgePoints && forgePointsInput) {
                acc.forgePoints += production.forgePoints * production.chance;
            }

            if (production.currentGoods && currentGoodsInput) {
                acc.currentGoods += production.currentGoods * production.chance;
            }

            if (production.previousGoods && previousGoodsInput) {
                acc.previousGoods += production.previousGoods * production.chance;
            }

            if (production.unrefinedGoods && unrefinedGoodsInput) {
                acc.unrefinedGoods += production.unrefinedGoods * production.chance;
            }

            if (production.coins && coinsInput) {
                acc.coins += production.coins * production.chance * coinBoostInput * 2;
            }

            if (production.supplies && suppliesInput) {
                acc.supplies += production.supplies * production.chance * supplyBoostInput * 2;
            }

            if (production.units && unitsInput) {
                acc.units += production.units * production.chance;
            }

            if (production.redAttack && redAttackInput) {
                acc.redAttack += production.redAttack * production.chance;
            }

            if (production.redDefence && redDefenceInput) {
                acc.redDefence += production.redDefence * production.chance;
            }

            if (production.blueAttack && blueAttackInput) {
                acc.blueAttack += production.blueAttack * production.chance;
            }

            if (production.blueDefence && blueDefenceInput) {
                acc.blueDefence += production.blueDefence * production.chance;
            }

            return acc;
        }, { forgePoints: 0, currentGoods: 0, previousGoods: 0, unrefinedGoods: 0, coins: 0, supplies: 0, units: 0, redAttack: 0, redDefence: 0, blueAttack: 0, blueDefence: 0, coinBoost: 0, supplyBoost: 0 });



        // Calculate efficiency based on total daily production and building area
        const efficiency = (
            totalProduction.forgePoints / Math.max(1, forgePointsInput) +
            totalProduction.currentGoods / Math.max(1, currentGoodsInput) +
            totalProduction.previousGoods / Math.max(1, previousGoodsInput) +
            totalProduction.unrefinedGoods / Math.max(1, unrefinedGoodsInput) +
            totalProduction.coins / Math.max(1, coinsInput) +
            totalProduction.supplies / Math.max(1, suppliesInput) +
            totalProduction.units / Math.max(1, unitsInput) +
            totalProduction.redAttack / Math.max(1, redAttackInput) +
            totalProduction.redDefence / Math.max(1, redDefenceInput) +
            totalProduction.blueAttack / Math.max(1, blueAttackInput) +
            totalProduction.blueDefence / Math.max(1, blueDefenceInput)
        ) / area;


        return { name: building.name, efficiency };
    });

    // Sort and display the list of buildings based on efficiency
    displayEfficiencyList(efficiencyResults);
}

function displayEfficiencyList(efficiencyResults) {
    // Sort the buildings by efficiency in descending order
    const sortedBuildings = efficiencyResults.sort((a, b) => b.efficiency - a.efficiency);

    // Display the sorted list
    const efficiencyListElement = document.getElementById('efficiencyList');
    efficiencyListElement.innerHTML = ''; // Clear previous results

    sortedBuildings.forEach(building => {
        const listItem = document.createElement('li');
        
        // Convert efficiency to percentage with decimals
        const efficiencyPercentage = (building.efficiency * 100).toFixed(2);

        listItem.innerText = `${building.name}: ${efficiencyPercentage}%`;
        efficiencyListElement.appendChild(listItem);
    });
}
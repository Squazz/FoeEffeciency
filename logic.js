const buildings = [
    { name: 'Abandoned Asylum', width: 5, length: 5, needsRoad: true, productions: [ 
            {forgePoints: 11, currentGoods: 20, previousGoods: 0, unrefinedGoods: 0, coins: 303500, supplies: 0, units: 0, redAttack: 25, redDefence: 0, blueAttack: 0, blueDefence: 0, coinBoost: 0, supplyBoost: 0, forgePointBoost: 0, chance: 1},
        ]
    },
    { name: 'Forgotten Temple', width: 3, length: 4, needsRoad: false, productions: [ 
            {forgePoints: 0, currentGoods: 0, previousGoods: 0, unrefinedGoods: 0, coins: 0, supplies: 0, units: 0, redAttack: 185, redDefence: 185, blueAttack: 195, blueDefence: 195, coinBoost: 0, supplyBoost: 0, forgePointBoost: 20, chance: 1},
        ]
    },
    { name: 'Majestic Winter Wonderland Pyramid', width: 4, length: 4, needsRoad: false, productions: [ 
            {forgePoints: 19, currentGoods: 48, previousGoods: 0, unrefinedGoods: 0, coins: 0, supplies: 134800, units: 12, redAttack: 37, redDefence: 0, blueAttack: 44, blueDefence: 0, coinBoost: 0, supplyBoost: 0, forgePointBoost: 0, chance: 1},
        ]
    },
    { name: 'Aegean Marinaresort', width: 4, length: 5, needsRoad: false, productions: [ 
            {forgePoints: 0, currentGoods: 60, previousGoods: 0, unrefinedGoods: 0, coins: 0, supplies: 0, units: 0, redAttack: 0, redDefence: 44, blueAttack: 37, blueDefence: 59, coinBoost: 0, supplyBoost: 0, forgePointBoost: 0, chance: 1},
            {forgePoints: 32, chance: .75},
        ]
    },
];

function calculateEfficiency() {
    // Get user input values
    const forgePointsInput = parseFloat(document.getElementById('forgePoints').value);
    const unitsInput = parseFloat(document.getElementById('units').value);

    const currentGoodsInput = parseFloat(document.getElementById('currentGoods').value);
    const previousGoodsInput = parseFloat(document.getElementById('previousGoods').value);
    const unrefinedGoodsInput = parseFloat(document.getElementById('unrefinedGoods').value);
    
    const coinsInput = parseFloat(document.getElementById('coins').value);
    const suppliesInput = parseFloat(document.getElementById('supplies').value);

    const redAttackInput = parseFloat(document.getElementById('redAttack').value);
    const redDefenceInput = parseFloat(document.getElementById('redDefence').value);
    const blueAttackInput = parseFloat(document.getElementById('blueAttack').value);
    const blueDefenceInput = parseFloat(document.getElementById('blueDefence').value);

    const coinBoostInput = (parseFloat(document.getElementById('coinBoost').value) / 100) + 1;
    const supplyBoostInput = (parseFloat(document.getElementById('supplyBoost').value) / 100) + 1;

    const forgePointProductionInput = parseFloat(document.getElementById('forgePointProduction').value);
    const coinsProductionInput = parseFloat(document.getElementById('coinProduction').value);
    const supplyProductionInput = parseFloat(document.getElementById('supplyProduction').value);

    const recurringTasksInput = parseFloat(document.getElementById('recurringTasks').value);
    const peopleAidedInput = parseFloat(document.getElementById('peopleAided').value);

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

            if (production.forgePointBoost && forgePointProductionInput) {
                acc.forgePointBoost += (production.forgePointBoost / 100) * production.chance;
            }

            return acc;
        }, { forgePoints: 0, currentGoods: 0, previousGoods: 0, unrefinedGoods: 0, coins: 0, supplies: 0, units: 0, redAttack: 0, redDefence: 0, blueAttack: 0, blueDefence: 0, coinBoost: 0, supplyBoost: 0, forgePointBoost: 0});



        // Calculate efficiency based on total daily production and building area
        const efficiency = (
            (forgePointsInput !== 0 ? totalProduction.forgePoints / forgePointsInput : 0) +
            (unitsInput !== 0 ? totalProduction.units / unitsInput : 0) +

            (currentGoodsInput !== 0 ? totalProduction.currentGoods / currentGoodsInput : 0) +
            (previousGoodsInput !== 0 ? totalProduction.previousGoods / previousGoodsInput : 0) +
            (unrefinedGoodsInput !== 0 ? totalProduction.unrefinedGoods / unrefinedGoodsInput : 0) +

            (coinsInput !== 0 ? totalProduction.coins / coinsInput : 0) +
            (suppliesInput !== 0 ? totalProduction.supplies / suppliesInput : 0) +
            
            (redAttackInput !== 0 ? totalProduction.redAttack / redAttackInput : 0) +
            (redDefenceInput !== 0 ? totalProduction.redDefence / redDefenceInput : 0) +
            (blueAttackInput !== 0 ? totalProduction.blueAttack / blueAttackInput : 0) +
            (blueDefenceInput !== 0 ? totalProduction.blueDefence / blueDefenceInput : 0) +

            (forgePointProductionInput !== 0 ? totalProduction.forgePointBoost * forgePointProductionInput : 0)
        ) / area;


        return { name: building.name, efficiency };
    });

    // Sort and display the list of buildings based on efficiency
    displayEfficiencyList(efficiencyResults);
}

function displayEfficiencyList(efficiencyResults) {
    // Sort the buildings by efficiency in descending order
    const sortedBuildings = efficiencyResults.sort((a, b) => a.efficiency - b.efficiency);

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
document.querySelectorAll('input[name="method"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
        var item = event.target.value;
        document.querySelectorAll('.result-table').forEach((table) => {
            table.classList.add('hidden');
        });
        document.getElementById('result-' + item.toLowerCase()).classList.remove('hidden');
    });
});

function calculateNWC() {
    const supply = [7500, 10000, 8100];
    const demand = [4200, 8300, 6300, 7200];
    const costs = [
        [0.12, 0.14, 0.08, 0.21],
        [0.13, 0.17, 0.10, 0.16],
        [0.15, 0.12, 0.12, 0.14]
    ];
    const allocation = Array.from({ length: supply.length + 1 }, () => Array(demand.length).fill(0)); // Include dummy row

    allocation[0][0] = 4200;
    allocation[0][1] = 3300;
    allocation[1][1] = 5000;
    allocation[1][2] = 5000;
    allocation[2][2] = 1300;
    allocation[2][3] = 6800;
    allocation[3][3] = 400;

    return allocation;
}

function displayNWCTable() {
    const allocation = calculateNWC();
    const tableBody = document.getElementById('nwc-table-body');
    tableBody.innerHTML = ''; // Clear existing table

    const supply = [7500, 10000, 8100, 400];
    const rows = ['S1', 'S2', 'S3', 'Dummy'];
    rows.forEach((supplyName, rowIndex) => {
        const row = allocation[rowIndex];
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="border border-gray-300 px-4 py-2">${supplyName}</td>` +
            row.map(cell => `<td class="border border-gray-300 px-4 py-2 text-center">${cell || ''}</td>`).join('') +
            `<td class="border border-gray-300 px-4 py-2 text-center">${supply[rowIndex]}</td>`;
        tableBody.appendChild(tr);
    });
}

function calculateSteppingStone() {
    const allocation = [
        [4200, 3300, 0, 0],
        [0, 5000, 5000, 0],
        [0, 0, 1300, 6800]
    ];

    const supply = [7500, 10000, 8100];
    const demand = [4200, 8300, 6300, 7200];

    const costs = [
        [0.12, 0.14, 0.08, 0.21],
        [0.13, 0.17, 0.10, 0.16],
        [0.15, 0.12, 0.12, 0.14]
    ];

    function calculateDeltaC(allocation, costs, i, j) {
        let deltaC = costs[i][j];

        if (allocation[i][j] === 0) {
            deltaC -= costs[i][0] + costs[0][j];
        }

        return deltaC;
    }

    const nonBasisVariables = [
        {i: 0, j: 2}, {i: 0, j: 3},
        {i: 1, j: 0}, {i: 1, j: 3},
        {i: 2, j: 0}, {i: 2, j: 1}
    ];

    const deltaCs = nonBasisVariables.map(variable => {
        return {
            variable,
            deltaC: calculateDeltaC(allocation, costs, variable.i, variable.j)
        };
    });

    console.log(deltaCs);

    // Update the result table with calculated Delta Cs
    const tableBody = document.getElementById('stepping-stone-table-body');
    tableBody.innerHTML = ''; // Clear existing table

    deltaCs.forEach(({ variable, deltaC }) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="border border-gray-300 px-4 py-2">${variable.i + 1}</td>` +
            `<td class="border border-gray-300 px-4 py-2">${variable.j + 1}</td>` +
            `<td class="border border-gray-300 px-4 py-2">${deltaC.toFixed(2)}</td>`;
        tableBody.appendChild(tr);
    });
}

// Call the function to display the initial NWCR table
displayNWCTable();

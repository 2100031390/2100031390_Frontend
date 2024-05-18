document.addEventListener('DOMContentLoaded', function() {
    const data = [
        { name: 'John Doe', age: 28, city: 'New York' },
        { name: 'Jane Smith', age: 34, city: 'Los Angeles' },
        { name: 'Alice Johnson', age: 22, city: 'Chicago' },
        { name: 'Bob Brown', age: 40, city: 'Houston' },
        { name: 'Zara Lee', age: 25, city: 'Miami' },
        { name: 'Daniel Kim', age: 31, city: 'Seattle'},
        { name: 'Eva Martinez', age: 29, city: 'San Francisco' },
        { name: 'Michael Adams', age: 37, city: 'Boston' },
        { name: 'Olivia White', age: 26, city: 'Denver' }
        // Add more data for larger dataset
    ];

    const rowsPerPage = 5;
    let currentPage = 1;

    const table = document.getElementById('data-table').querySelector('tbody');
    const filterInput = document.getElementById('filter-input');
    const pagination = document.getElementById('pagination');

    function renderTable(data) {
        table.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            Object.values(row).forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    }

    function paginateData(data, page, rowsPerPage) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return data.slice(start, end);
    }

    function updatePagination(data, page, rowsPerPage) {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(data.length / rowsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            if (i === page) button.classList.add('active');
            button.addEventListener('click', function() {
                currentPage = i;
                renderTable(paginateData(data, currentPage, rowsPerPage));
                updatePagination(data, currentPage, rowsPerPage);
            });
            pagination.appendChild(button);
        }
    }

    function sortData(data, column, order) {
        return data.sort((a, b) => {
            if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
            return 0;
        });
    }

    document.querySelectorAll('th').forEach(th => {
        th.addEventListener('click', function() {
            const column = th.getAttribute('data-column');
            const order = th.getAttribute('data-order');
            const sortedData = sortData(data, column, order);
            th.setAttribute('data-order', order === 'asc' ? 'desc' : 'asc');
            renderTable(paginateData(sortedData, currentPage, rowsPerPage));
        });
    });

    filterInput.addEventListener('input', function() {
        const filteredData = data.filter(row =>
            Object.values(row).some(val =>
                val.toString().toLowerCase().includes(filterInput.value.toLowerCase())
            )
        );
        currentPage = 1;
        renderTable(paginateData(filteredData, currentPage, rowsPerPage));
        updatePagination(filteredData, currentPage, rowsPerPage);
    });

    renderTable(paginateData(data, currentPage, rowsPerPage));
    updatePagination(data, currentPage, rowsPerPage);
});

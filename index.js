
        // Load expenses from local storage on page load
        window.onload = function () {
            loadExpenses();
        };

        function addExpense() {
            var expense = document.getElementById("expense").value;
            var description = document.getElementById("description").value;
            var category = document.getElementById("category").value;

            var expenseItem = document.createElement("div");
            expenseItem.innerHTML = "<ul><li>" + expense + " - " + description + " - " + category +
                "<button style='margin:10px' onclick='editExpense(this)'>Edit Expense</button>" +
                "<button onclick='deleteExpense(this)'>Delete Expense</button></li></ul>";

            document.getElementById("expenseList").appendChild(expenseItem);

            // Save expenses to local storage after adding a new expense
            saveExpenses();
        }

        function editExpense(button) {
            var listItem = button.parentNode;
            var expense = listItem.textContent.trim();
            var expenseParts = expense.split(" - ");
            var originalExpense = expenseParts[0];
            var originalDescription = expenseParts[1];
            var originalCategory = expenseParts[2];

            listItem.innerHTML = "<label for='editedExpense'>Edit Expense Amount</label>" +
                                "<input type='number' id='editedExpense' value='" + originalExpense + "'/>" +
                                "<label for='editedDescription'>Edit Description</label>" +
                                "<input type='text' id='editedDescription' value='" + originalDescription + "'/>" +
                                "<label for='editedCategory'>Edit Category</label>" +
                                "<select id='editedCategory'>" +
                                    "<option value='fuel'>Fuel</option>" +
                                    "<option value='food'>Food</option>" +
                                    "<option value='electricity'>Electricity</option>" +
                                    "<option value='movie'>Movie</option>" +
                                "</select>" +
                                "<button style='margin:10px' onclick='saveExpense(this)'>Save Changes</button>" +
                                "<button onclick='deleteExpense(this)'>Delete Expense</button>";

            document.getElementById('editedCategory').value = originalCategory;
        }

        function saveExpense(button) {
            var listItem = button.parentNode;
            var editedExpense = document.getElementById("editedExpense").value;
            var editedDescription = document.getElementById("editedDescription").value;
            var editedCategory = document.getElementById("editedCategory").value;

            listItem.innerHTML = "<p>" + editedExpense + " - " + editedDescription + " - " + editedCategory +
                "<button style='margin:10px' onclick='editExpense(this)'>Edit Expense</button>" +
                "<button onclick='deleteExpense(this)'>Delete Expense</button></p>";

            // Save expenses to local storage after editing an expense
            saveExpenses();
        }

        function deleteExpense(button) {
            button.parentNode.remove();

            // Save expenses to local storage after deleting an expense
            saveExpenses();
        }

        function saveExpenses() {
            var expenseList = document.getElementById("expenseList").innerHTML;
            localStorage.setItem("expenses", JSON.stringify(expenseList));
        }

        function loadExpenses() {
            var expenseList = localStorage.getItem("expenses");
            if (expenseList) {
                document.getElementById("expenseList").innerHTML = JSON.parse(expenseList);
            }
        }


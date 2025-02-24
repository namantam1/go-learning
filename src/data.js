export default [
  {
    "title": "Hello, Go!",
    "description": "Write your first Go program that prints \"Hello, World!\" to the console.",
    "prerequisites": [
      "Understanding of what a programming language is",
      "Basic concept of program output"
    ],
    "initialCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Write your code here\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}"
  },
  {
    "title": "Variables and Data Types",
    "description": "Declare variables of different data types (integer, float, boolean, string) and print their values.",
    "prerequisites": [
      "Basic understanding of programming variables and data types"
    ],
    "initialCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Declare your variables here\n    // Print the variables\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var i int = 42\n    var f float64 = 3.14\n    var b bool = true\n    var s string = \"GoLang\"\n\n    fmt.Println(\"Integer:\", i)\n    fmt.Println(\"Float:\", f)\n    fmt.Println(\"Boolean:\", b)\n    fmt.Println(\"String:\", s)\n}"
  },
  {
    "title": "Constants",
    "description": "Define constants for Pi and the number of days in a week, then print their values.",
    "prerequisites": [
      "Understanding of variables and constants in programming"
    ],
    "initialCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Define your constants here\n    // Print the constants\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    const Pi = 3.14159\n    const DaysInWeek = 7\n\n    fmt.Println(\"Pi:\", Pi)\n    fmt.Println(\"Days in a week:\", DaysInWeek)\n}"
  },
  {
    "title": "Basic Arithmetic Operations",
    "description": "Perform addition, subtraction, multiplication, and division with two numbers and print the results.",
    "prerequisites": [
      "Familiarity with basic arithmetic operations"
    ],
    "initialCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Declare two numbers\n    // Perform arithmetic operations and print the results\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    a := 10\n    b := 5\n\n    fmt.Println(\"Addition:\", a+b)\n    fmt.Println(\"Subtraction:\", a-b)\n    fmt.Println(\"Multiplication:\", a*b)\n    fmt.Println(\"Division:\", a/b)\n}"
  },
  {
    "title": "Conditional Statements",
    "description": "Write a program that checks if a number is positive, negative, or zero and prints the result.",
    "prerequisites": [
      "Understanding of if-else statements"
    ],
    "initialCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Declare a number\n    // Use if-else statements to check if the number is positive, negative, or zero\n    // Print the result\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    number := -10\n\n    if number > 0 {\n        fmt.Println(\"The number is positive.\")\n    } else if number < 0 {\n        fmt.Println(\"The number is negative.\")\n    } else {\n        fmt.Println(\"The number is zero.\")\n    }\n}"
  },
  {
    "title": "Loops",
    "description": "Create a program that prints numbers from 1 to 10 using a for loop.",
    "prerequisites": [
      "Understanding of for loops"
    ],
    "initialCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Use a for loop to print numbers from 1 to 10\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 1; i <= 10; i++ {\n        fmt.Println(i)\n    }\n}"
  },
  {
    "title": "Functions",
    "description": "Define a function that takes two integers as parameters and returns their sum.",
    "prerequisites": [
      "Basic understanding of functions and parameters"
    ],
    "initialCode": "package main\n\nimport \"fmt\"\n\n// Define your function here\n\nfunc main() {\n    // Call the function and print the result\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc add(a int, b int) int {\n    return a + b\n}\n\nfunc main() {\n    result := add(3, 4)\n    fmt.Println(\"Sum:\", result)\n}"
  },
  {
    "title": "Arrays",
    "description": "Declare an array of five integers and calculate their average.",
    "prerequisites": [
      "Understanding of arrays and basic looping"
    ],
    "initialCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Declare an array of five integers\n    // Calculate the sum and average\n    // Print the average\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    numbers := [5]int{10, 20, 30, 40, 50}\n    sum := 0\n\n    for _, number := range numbers {\n        sum += number\n    }\n\n    average := float64(sum) / float64(len(numbers))\n    fmt.Println(\"Average:\", average)\n}"
  },
  {
    "title": "Slices",
    "description": "Create a slice of strings containing the names of the days of the week and print them.",
    "prerequisites": [
      "Understanding of slices and basic looping"
    ],
    "initialCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Create a slice of strings for the days of the week\n    // Print each day\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    daysOfWeek := []string{\"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\", \"Sunday\"}\n\n    for _, day := range daysOfWeek {\n        fmt.Println(day)\n    }\n}"
  },
  {
    "title": "Maps",
    "description": "Create a map that associates the names of countries with their capitals and print each pair.",
    "prerequisites": [
        "Understanding of maps (dictionaries) and basic looping"
    ],
    "initialCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Declare a map with country names as keys and their capitals as values\n    // Print each country-capital pair\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    capitals := map[string]string{\n        \"USA\": \"Washington, D.C.\",\n        \"India\": \"New Delhi\",\n        \"France\": \"Paris\",\n        \"Japan\": \"Tokyo\"\n    }\n\n    for country, capital := range capitals {\n        fmt.Println(country, \"-\", capital)\n    }\n}"
},
  {
    "title": "Pointers",
    "description": "Create a function that takes a pointer to an integer and increments its value.",
    "prerequisites": [
      "Understanding of pointers and function parameters"
    ],
    "initialCode": "package main\n\nimport \"fmt\"\n\n// Define your function here\n\nfunc main() {\n    // Declare an integer variable\n    // Pass its address to the function\n    // Print the modified value\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc increment(n *int) {\n    *n++\n}\n\nfunc main() {\n    num := 10\n    increment(&num)\n    fmt.Println(\"Incremented value:\", num)\n}"
  },
  {
    "title": "Error Handling",
    "description": "Write a function that divides two numbers and returns an error if the denominator is zero.",
    "prerequisites": [
      "Understanding of functions, error handling, and return values"
    ],
    "initialCode": "package main\n\nimport (\n    \"fmt\"\n    \"errors\"\n)\n\n// Define your function here\n\nfunc main() {\n    // Call the function and handle the error\n}",
    "solution": "package main\n\nimport (\n    \"fmt\"\n    \"errors\"\n)\n\nfunc divide(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, errors.New(\"division by zero is not allowed\")\n    }\n    return a / b, nil\n}\n\nfunc main() {\n    result, err := divide(10, 2)\n    if err != nil {\n        fmt.Println(\"Error:\", err)\n    } else {\n        fmt.Println(\"Result:\", result)\n    }\n}"
  },
  {
    "title": "Structs",
    "description": "Define a struct for a 'Person' with name and age fields, and create an instance of it.",
    "prerequisites": [
      "Understanding of struct types and data organization"
    ],
    "initialCode": "package main\n\nimport \"fmt\"\n\n// Define your struct here\n\nfunc main() {\n    // Create an instance of the struct and print its values\n}",
    "solution": "package main\n\nimport \"fmt\"\n\ntype Person struct {\n    Name string\n    Age  int\n}\n\nfunc main() {\n    p := Person{Name: \"Alice\", Age: 30}\n    fmt.Println(\"Name:\", p.Name)\n    fmt.Println(\"Age:\", p.Age)\n}"
  },
  {
    "title": "Interfaces",
    "description": "Create an interface named 'Shape' with a method 'Area' and implement it for a 'Rectangle' struct.",
    "prerequisites": [
      "Understanding of interfaces and method implementation"
    ],
    "initialCode": "package main\n\nimport \"fmt\"\n\n// Define your interface and struct here\n\nfunc main() {\n    // Create an instance of Rectangle and call its Area method\n}",
    "solution": "package main\n\nimport \"fmt\"\n\ntype Shape interface {\n    Area() float64\n}\n\ntype Rectangle struct {\n    Width, Height float64\n}\n\nfunc (r Rectangle) Area() float64 {\n    return r.Width * r.Height\n}\n\nfunc main() {\n    rect := Rectangle{Width: 10, Height: 5}\n    fmt.Println(\"Area of Rectangle:\", rect.Area())\n}"
  },
  {
    "title": "Goroutines",
    "description": "Create a simple Goroutine that prints 'Hello from Goroutine!' asynchronously.",
    "prerequisites": [
      "Understanding of concurrency and Goroutines"
    ],
    "initialCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    // Create a Goroutine here\n    // Use time.Sleep to allow the Goroutine to complete execution\n}",
    "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc sayHello() {\n    fmt.Println(\"Hello from Goroutine!\")\n}\n\nfunc main() {\n    go sayHello()\n    time.Sleep(1 * time.Second)\n}"
  },
  {
    "title": "Channels",
    "description": "Use a channel to send a message between Goroutines.",
    "prerequisites": [
      "Understanding of Goroutines and channels"
    ],
    "initialCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Declare and use a channel to send and receive data\n}",
    "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := make(chan string)\n\n    go func() {\n        message <- \"Hello from channel!\"\n    }()\n\n    fmt.Println(<-message)\n}"
  }
].map((el, id) => ({id, ...el}))

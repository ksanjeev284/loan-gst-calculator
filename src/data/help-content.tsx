export const loanEMIHelp = {
  faqs: [
    {
      question: "What is EMI?",
      answer: "EMI (Equated Monthly Installment) is a fixed amount that you pay to the lender each month until the loan is fully repaid. It includes both principal and interest components."
    },
    {
      question: "How is EMI calculated?",
      answer: "EMI is calculated using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is Principal, r is monthly interest rate, and n is loan tenure in months."
    },
    {
      question: "Why does my EMI change when I adjust the loan tenure?",
      answer: "Loan tenure affects the total interest paid. A longer tenure means lower EMIs but higher total interest, while a shorter tenure means higher EMIs but lower total interest."
    },
    {
      question: "Can I prepay my loan?",
      answer: "Yes, most loans can be prepaid. However, some lenders may charge a prepayment penalty. Check with your lender for specific terms."
    }
  ],
  howToUse: [
    {
      title: "Enter Loan Amount",
      description: "Input the total loan amount you wish to borrow in the 'Loan Amount' field."
    },
    {
      title: "Specify Interest Rate",
      description: "Enter the annual interest rate offered by your lender in percentage."
    },
    {
      title: "Choose Loan Tenure",
      description: "Select the duration for which you want to take the loan in years."
    },
    {
      title: "View Results",
      description: "The calculator will instantly show your monthly EMI, total interest payable, and total payment amount."
    }
  ]
}

export const gstHelp = {
  faqs: [
    {
      question: "What is GST?",
      answer: "GST (Goods and Services Tax) is a comprehensive indirect tax levied on the supply of goods and services in India."
    },
    {
      question: "What are the different GST rates?",
      answer: "The main GST rates in India are 0%, 5%, 12%, 18%, and 28%. Some luxury and sin goods may have additional cess."
    },
    {
      question: "How is GST calculated?",
      answer: "GST is calculated as a percentage of the base price. For example, if an item costs ₹100 and GST is 18%, the GST amount would be ₹18."
    },
    {
      question: "What is inclusive vs exclusive GST?",
      answer: "In exclusive GST, the tax is added to the base price. In inclusive GST, the tax is already included in the final price and needs to be calculated backward."
    }
  ],
  howToUse: [
    {
      title: "Enter Base Amount",
      description: "Input the original price of the goods or services before GST."
    },
    {
      title: "Select GST Rate",
      description: "Choose the applicable GST rate from the dropdown menu."
    },
    {
      title: "Choose Calculation Type",
      description: "Select whether you want to calculate GST exclusive or inclusive of the base amount."
    },
    {
      title: "Review Results",
      description: "View the calculated GST amount and final price including GST."
    }
  ]
}

export const taxHelp = {
  faqs: [
    {
      question: "What is the difference between old and new tax regime?",
      answer: "The new tax regime offers lower tax rates but removes most deductions and exemptions, while the old regime has higher rates but allows various deductions."
    },
    {
      question: "What are tax slabs?",
      answer: "Tax slabs are income ranges that determine the tax rate applicable to that portion of your income. India follows a progressive tax system where higher income is taxed at higher rates."
    },
    {
      question: "Are there any tax exemptions?",
      answer: "Yes, under the old regime, there are various exemptions like 80C investments, HRA, medical insurance, etc. The new regime has minimal exemptions."
    },
    {
      question: "How is taxable income calculated?",
      answer: "Taxable income is your gross income minus applicable deductions and exemptions. Different tax rates apply to different portions of this income as per the tax slabs."
    }
  ],
  howToUse: [
    {
      title: "Enter Annual Income",
      description: "Input your total annual income from all sources."
    },
    {
      title: "Choose Tax Regime",
      description: "Select between the old and new tax regime based on your preference."
    },
    {
      title: "Add Deductions (Old Regime)",
      description: "If using the old regime, enter applicable deductions like 80C investments, HRA, etc."
    },
    {
      title: "View Tax Calculation",
      description: "Review your tax liability, tax saving under different regimes, and effective tax rate."
    }
  ]
}

export const loanComparisonHelp = {
  faqs: [
    {
      question: "Why compare loans?",
      answer: "Comparing loans helps you find the best deal by evaluating different interest rates, tenures, and EMIs offered by various lenders."
    },
    {
      question: "What factors should I consider when comparing loans?",
      answer: "Key factors include interest rate, loan tenure, processing fees, prepayment charges, and total interest payable."
    },
    {
      question: "How do different tenures affect my loan?",
      answer: "Longer tenures reduce your EMI but increase the total interest paid. Shorter tenures mean higher EMIs but lower total interest."
    },
    {
      question: "Should I choose the loan with the lowest EMI?",
      answer: "Not necessarily. Consider the total cost of the loan (principal + total interest) rather than just the EMI. A lower EMI might mean paying more in total interest."
    }
  ],
  howToUse: [
    {
      title: "Enter First Loan Details",
      description: "Input the loan amount, interest rate, and tenure for the first loan option."
    },
    {
      title: "Enter Second Loan Details",
      description: "Input the same details for the second loan option you want to compare."
    },
    {
      title: "Compare Results",
      description: "Review the comparison of EMIs, total interest, and total payment for both loans."
    },
    {
      title: "Analyze the Difference",
      description: "Check the cost difference between loans to make an informed decision."
    }
  ]
}

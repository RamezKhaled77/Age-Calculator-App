const daysLabel = document.querySelector('[for="day"]');
const monthsLabel = document.querySelector('[for="month"]');
const yearsLabel = document.querySelector('[for="year"]');
const daysInp = document.querySelector("#day");
const monthsInp = document.querySelector("#month");
const yearsInp = document.querySelector("#year");
const btn = document.querySelector("[type='submit']");
const yearsNum = document.querySelector("#yNum");
const monthsNum = document.querySelector("#mNum");
const daysNum = document.querySelector("#dNum");
const errDayMsg = document.querySelector("#errDay");
const errMonthMsg = document.querySelector("#errMonth");
const errYearMsg = document.querySelector("#errYear");



btn.addEventListener("click", (e) => {
    e.preventDefault();

    let daysVal = daysInp.value.trim();
    let monthsVal = monthsInp.value.trim();
    let yearsVal = yearsInp.value.trim();

    //! Regular Expressions
    const daysRegex = /^(0?[1-9]|[12][0-9]|3[01])$/; //* Valid days: 01-31
    const monthsRegex = /^(0?[1-9]|1[0-2])$/;        //* Valid months: 01-12
    const yearsRegex = /^(19[0-9]{2}|20[0-9]{2})$/;  //* Valid years: 1900-2099

    //! Validate Inputs
    if (!daysRegex.test(daysVal)) {
        daysInp.style.borderColor = "var(--Light-red)";
        daysLabel.style.color = "var(--Light-red)";
        errDayMsg.style.transform = "translateY(0px)";
        return;
    } else {
        daysInp.style.borderColor = "var(--Light-grey)";
        daysLabel.style.color = "var(--Smokey-grey)";
        errDayMsg.style.transform = "translateY(-37px)";
    }
    if (!monthsRegex.test(monthsVal)) {
        monthsInp.style.borderColor = "var(--Light-red)";
        monthsLabel.style.color = "var(--Light-red)";
        errMonthMsg.style.transform = "translateY(0px)";
        return;
    } else {
        monthsInp.style.borderColor = "var(--Light-grey)";
        monthsLabel.style.color = "var(--Smokey-grey)";
        errMonthMsg.style.transform = "translateY(-37px)";
    }
    if (!yearsRegex.test(yearsVal) || parseInt(yearsVal) > new Date().getFullYear()) {
        yearsInp.style.borderColor = "var(--Light-red)";
        yearsLabel.style.color = "var(--Light-red)";
        errYearMsg.style.transform = "translateY(0px)";
        return;
    } else {
        yearsInp.style.borderColor = "var(--Light-grey)";
        yearsLabel.style.color = "var(--Smokey-grey)";
        errYearMsg.style.transform = "translateY(-37px)";
    }

    //! Convert inputs to numbers
    daysVal = parseInt(daysVal, 10);
    monthsVal = parseInt(monthsVal, 10);
    yearsVal = parseInt(yearsVal, 10);

    //! Check if the date is valid
    let dateNow = new Date();
    let BirthDate = new Date(`${monthsVal}/${daysVal}/${yearsVal}`);

    if (BirthDate > dateNow) {
        alert("The birthdate cannot be in the future.");
        return;
    }

    let years = dateNow.getFullYear() - BirthDate.getFullYear();

    let months = dateNow.getMonth() - BirthDate.getMonth();
    if (months < 0) {
        months += 12;
        years -= 1;
    }

    let days = dateNow.getDate() - BirthDate.getDate();
    if (days < 0) {
        const previousMonth = new Date(
            dateNow.getFullYear(),
            dateNow.getMonth() - 1,
            0
        );
        days += previousMonth.getDate();
        months -= 1;
        if (months < 0) {
            months += 12;
            years -= 1;
        }
    }

    if (days === 30) {
        days = 0;
        months++;
    }

    if (months === 12) {
        months = 0;
        years++;
    }

    yearsNum.innerHTML = years < 10 ? `0${years}` : years;
    monthsNum.innerHTML = months < 10 ? `0${months}` : months;
    daysNum.innerHTML = days < 10 ? `0${days}` : days;
});

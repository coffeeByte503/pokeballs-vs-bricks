(function () {
    var questions = [{
        question: "What is a phone?",
        choices: [46, 36, 26],
        correctAnswer: 2
    }]

    var questionCounter = 0;
    var selections = [];
    var quiz = $('#answer');

    displayNext();

    $('#next').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();

        if (isNaN(selections[questionCounter])) {
            alert('Select answer.');
        } else {
            questionCounter++;
            displayNext();
        }
    });

    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h3>' + (index + 1) + '/34</h3>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }

    function createRadios(index) {
        var radioList = $('<ol type="A">');
        var item;
    }
})
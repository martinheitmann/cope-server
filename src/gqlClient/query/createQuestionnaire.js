const { request } = require('graphql-request');

const query = `mutation QuestionnaireCreate {
  QuestionnaireCreate( 
      resource: {
      resourceType: Questionnaire,
      id: "madrs-questionnaire",
      meta: {
        profile: [
          "http://hl7.org/fhir/StructureDefinition/cqf-questionnaire"
        ]
      },
      text: {
        status: "generated",
        div: "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Montgomery–Aasberg Depression Rating Scale</div>"
      },
      title: "Montgomery–Aasberg Depression Rating Scale (MADR-S)",
      status: "draft",
      subjectType: [
        "Patient"
      ],
      item: [
        {
          linkId: "ApparentSadness",
          text: "Despondency, gloom, and despair (more than just ordinary transient low spirits), reflected in speech, facial expression, and posture; rate by depth and inability to brighten up",
          type: "choice",
          required: true
        },
        {
          linkId: "ReportedSadness",
          text: "Reports of depressed mood, regardless of whether it is reflected in appearance or not; includes low spirits, despondency, or the feeling of being beyond help and without hope",
          type: "choice",
          required: true
        },
        {
          linkId: "InnerSadness",
          text: "Feelings of ill-defined discomfort, edginess, inner turmoil, mental tension mounting to either panic, dread, or anguish; rate by intensity, frequency, duration, and extent of reassurance called for",
          type: "choice",
          required: true,
        },
        {
          linkId: "ReducedSleep",
          text: "Experience of reduced duration or depth of sleep compared to the patient's own normal pattern when well",
          type: "choice",
          required: true,
        },
        {
          linkId: "ReducedAppetite",
          text: "Feeling of loss of appetite; rate by loss of desire for food or the need to force oneself to eat",
          type: "choice",
          required: true,
        },
        {
          linkId: "ConcentrationDifficulty",
          text: "Difficulties in collecting one’s thoughts mounting to incapacitating lack of concentration; rate by intensity, frequency, and degree of incapacity produced",
          type: "choice",
          required: true,
        },
        {
          linkId: "Lassitude",
          text: "Difficulty getting started or slowness initiating and performing everyday activities",
          type: "choice",
          required: true,
        },
        {
          linkId: "InabilityToFeel",
          text: "Subjective experience of reduced interest in the surroundings or activities that normally give pleasure; the ability to react with adequate emotion to circumstances or people is reduced",
          type: "choice",
          required: true,
        },
        {
          linkId: "PessimisticThoughts",
          text: "Thoughts of guilt, inferiority, self reproach, sinfulness, remorse, and ruin",
          type: "choice",
          required: true,
        },
        {
          linkId: "SuicidalThoughts",
          text: "Feeling that life is not worth living, that a natural death would be welcome, suicidal thoughts, and the preparations for suicide; suicidal attempts should not in themselves influence the rating",
          type: "choice",
          required: true,
        },
        {
          extension: [
            {
              url: "http://hl7.org/fhir/StructureDefinition/cqf-expression",
              valueExpression: {
                language: "text/cql",
                expression: "CalculateTotalScore"
              }
            }
          ],
          linkId: "TotalScore",
          text: "Total score",
          type: "integer",
          required: true
        },
      ]
    })
    {
        id
    }
}`;


function createQuestionnaire () {
    request('http://localhost:3000/4_0_0/$graphql', query).then(data =>
        console.log(data)
    );
}

function getQuestionnaireById(id){

}

module.exports = createQuestionnaire;
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateContent(prompt: string) {
    if(!prompt){
        throw new Error("Prompt is required");
    }
    //   const prompt = "Write a story about a magic backpack.";
    const result = await model.generateContent(systemInstructions + prompt);
    // console.log(result.response.text());
    return result;
}


// 사전 지시 프롬프트
const systemInstructions = `사용자는 주로 기술(웹 개발, 컴퓨터공학)과 관련된 그의 개인적인 경험에 대한 블로그를 작성합니다.
블로그의 내용은 감성적이기 보다는 이성적이고, 사실에 기반한 정보들을 제공합니다.
사용자는 독자에게 신뢰성있는 느낌을 주고 싶어하며, 블로그를 통해 자신의 포트폴리오를 쌓아 갈 겁니다.
블로그의 제목은 독자의 이목을 끌기 위해 가끔씩 어그로성이 될 수도 있습니다.
당신의 역할은 사용자를 도와 블로그를 성공적으로 작성할 수 있게 하는 것입니다.

입력받은 블로그의 내용을 바탕으로 다음 항목들을 만들어 유저에게 제공하세요.
다음 "(권장)" 키워드가 앞에 써진 항목들은 필수적으로 지켜져야 하진 않지만, 해당 조건을 되도록 달성해야 합니다.
1. 해당 블로그에 들어갈만할 추천 제목
- 제목은 블로그의 내용을 핵심적으로 요약해야 합니다.
- 제목의 길이는 최대 100자까지입니다.
- 제목은 영어/한국어가 될 수 있고 블로그의 카테고리와 관련된 내용이 포함될 수 있습니다.
2. 해당 블로그가 웹에 게시될 때 사용될 slug를 만드세요.
- slug는 영어 단어 및 하이픈 (-)으로 구성됩니다.
- 보기에 명확해야 합니다.
- 해당 글의 slug는 블로그의 내용과 관련되어야 합니다. 
(권장) - 독자는 slug를 보고 블로그의 내용을 얼추 예상하거나, 독자의 궁금증을 유발할 수 있어야 합니다.
- 5단어 내로 구성되며 총 글자수는 20~30자 내외가 되어야 합니다.

return 형식은 json 형식으로 다음과 같습니다
이렇게 10개의 추천 제목과 slug를 만들어 보내주세요.

[
{
'title':{Recommended title 1},
'slug':{Recommended slug 1}
},
{
'title':{Recommended title 2},
'slug':{Recommended slug 2}
},
{
'title':{Recommended title},
'slug':{Recommended slug}
},
{
'title':{Recommended title},
'slug':{Recommended slug}
},
{
'title':{Recommended title},
'slug':{Recommended slug}
},
{
'title':{Recommended title},
'slug':{Recommended slug}
},
{
'title':{Recommended title},
'slug':{Recommended slug}
},
{
'title':{Recommended title},
'slug':{Recommended slug}
},
{
'title':{Recommended title},
'slug':{Recommended slug}
},
{
'title':{Recommended title},
'slug':{Recommended slug}
},
]

내용: `;
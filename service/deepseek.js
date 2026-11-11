import axios from "axios";

/**
 * DeepSeek 服务
 * DeepSeek 接口兼容 OpenAI 的 chat completions 格式，
 * 这里直接用 axios 调用，无需依赖 openai SDK。
 */
export class DeepSeek {
    #baseUrl = null;
    #apiKey = null;

    constructor() {
        this.#baseUrl = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1";
        this.#apiKey = process.env.DEEPSEEK_API_KEY;
    }

    async ctChat(context) {
        try {
            const res = await axios.post(
                `${this.#baseUrl}/chat/completions`,
                {
                    model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
                    messages: context
                },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.#apiKey}`
                    }
                }
            );

            return res;
        }
        catch (error) {
            console.log("DeepSeek happen error!");
            console.log(error?.response?.data?.error || error?.response?.data || error);
        }
    }

    async ctText(question) {
        return this.ctChat([{ role: "user", content: question }]);
    }
}

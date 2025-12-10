import MCPClient from "./MCPClient";
import Agent from "./Agent";
import path from "path";

const URL = 'https://news.ycombinator.com/'
const outPath = path.join(process.cwd(), 'output');
const TASK = `
爬取${URL}的内容，并且总结后保存到${outPath}的news.md文件。
`

const fetchMCP = new MCPClient("mcp-server-fetch", "uvx", ['mcp-server-fetch']);
const fileMCP = new MCPClient("mcp-server-file", "npx", ['-y', '@modelcontextprotocol/server-filesystem', outPath]);

async function main() {
    // Agent
    const agent = new Agent('openai/gpt-4o-mini', [fetchMCP, fileMCP]);
    await agent.init();
    const response = await agent.invoke(TASK);
    console.log('Final Response:', response);
    await agent.close();
}

main()
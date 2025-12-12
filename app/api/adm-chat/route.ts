import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: `You are ADM-Agent, a sophisticated project management AI assistant capable of analyzing complex project data and generating visual dashboards.
            
            Your goal is to help users understand their project files (like XER, CSV, etc.) and visualize the data.
            
            When the user asks for a chart or dashboard, you should return a JSON object in a specific format within your response to render the chart on the client side.
            
            Use the following JSON structure inside a code block tagged with 'json-dashboard' for any dashboard data:
            
            \`\`\`json-dashboard
            {
              "type": "bar" | "line" | "pie" | "area",
              "title": "Chart Title",
              "description": "Chart Description",
              "data": [
                 { "name": "Label1", "value": 100 },
                 { "name": "Label2", "value": 200 }
              ],
              "dataKey": "value",
              "xAxisKey": "name",
              "colors": ["#8884d8", "#82ca9d", "#ffc658"]
            }
            \`\`\`
            
            If the user provides file content or asks questions, analyze it deeply and provide professional construction/project management insights.`
                    },
                    ...messages
                ],
                stream: true,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json({ error: error.error?.message || 'Failed to fetch from OpenAI' }, { status: response.status });
        }

        // Pass the stream through
        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream',
            }
        });

    } catch (error) {
        console.error('Error in ADM Chat:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

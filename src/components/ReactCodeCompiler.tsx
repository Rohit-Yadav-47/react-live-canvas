
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

// Default sample code
const DEFAULT_CODE = `function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Interactive Counter</h2>
      <p className="text-gray-600 mb-4">You clicked {count} times</p>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
}`;

// Sample templates
const TEMPLATES = {
  counter: DEFAULT_CODE,
  todoList: `function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build an app', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([...todos, { 
      id: Date.now(), 
      text: newTodo, 
      completed: false 
    }]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Todo List</h2>
      
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center p-2 border border-gray-200 rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-2"
            />
            <span className={todo.completed ? 'line-through text-gray-400 flex-1' : 'flex-1'}>
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="px-2 py-1 text-sm text-red-500 hover:bg-red-100 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
  fetchData: `function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // This is a placeholder URL - it returns mock data
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Data Fetching Example</h2>
      
      {loading ? (
        <div className="text-center py-4">
          <div className="animate-pulse">Loading...</div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : data ? (
        <div className="border border-gray-200 rounded p-4">
          <h3 className="font-bold text-lg">{data.title}</h3>
          <p className="mt-2 text-gray-600">{data.body}</p>
        </div>
      ) : null}
    </div>
  );
}`,
  reactEmail: `function App() {
  return (
    <Html>
      <Head />
      <Preview>Welcome to our platform!</Preview>
      <Tailwind>
        <Body className="bg-gray-100 my-auto mx-auto font-sans">
          <Container className="border border-gray-200 rounded my-8 mx-auto p-5 max-w-md bg-white">
            <Img
              src="https://react.email/static/icons/react.png"
              width="50"
              height="50"
              alt="React Email"
              className="mx-auto my-4"
            />
            <Heading className="text-2xl font-bold text-center text-gray-800">
              Welcome to React Email
            </Heading>
            <Text className="text-gray-600 my-4">
              This is a simple email template built with React Email and Tailwind CSS.
              You can customize it to suit your needs.
            </Text>
            <Section className="text-center">
              <Button
                href="https://example.com"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Get Started
              </Button>
            </Section>
            <Text className="text-sm text-gray-500 text-center mt-8">
              © 2023 React Email. All rights reserved.
              <br />
              <Link href="https://example.com/unsubscribe" className="text-blue-500 hover:underline">
                Unsubscribe
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}`
};

// Function to generate complete HTML with React, ReactDOM, and Babel
const generateHTML = (reactCode: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>React Preview</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.development.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.development.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { margin: 0; padding: 16px; font-family: system-ui, -apple-system, sans-serif; }
        #root { height: 100%; }
        .error { color: red; padding: 8px; border: 1px solid red; border-radius: 4px; margin-top: 8px; background-color: #FEE; }
      </style>
    </head>
    <body>
      <div id="root"></div>
      <script type="text/babel">
        // React and ReactDOM are already loaded
        const { useState, useEffect, useRef, useCallback, useMemo, useContext, createContext } = React;
        
        // Import mock for @react-email/components
        const ReactEmail = {};
        
        // Mock the components from @react-email/components
        const {
          Body, Button, Container, Head, Heading, Html, Img, 
          Link, Preview, Section, Tailwind, Text
        } = {
          Body: ({ children, className, ...props }) => <body className={className} {...props}>{children}</body>,
          Button: ({ children, className, href, ...props }) => <a href={href} className={className} {...props}>{children}</a>,
          Container: ({ children, className, ...props }) => <div className={className} {...props}>{children}</div>,
          Head: ({ children, ...props }) => <head {...props}>{children}</head>,
          Heading: ({ children, className, ...props }) => <h1 className={className} {...props}>{children}</h1>,
          Html: ({ children, ...props }) => <html {...props}>{children}</html>,
          Img: ({ src, alt, width, height, className, ...props }) => 
            <img src={src} alt={alt} width={width} height={height} className={className} {...props} />,
          Link: ({ children, href, className, ...props }) => <a href={href} className={className} {...props}>{children}</a>,
          Preview: ({ children, ...props }) => <div style={{ display: 'none' }} {...props}>{children}</div>,
          Section: ({ children, className, ...props }) => <div className={className} {...props}>{children}</div>,
          Tailwind: ({ children, ...props }) => <div {...props}>{children}</div>,
          Text: ({ children, className, ...props }) => <p className={className} {...props}>{children}</p>
        };
        
        try {
          ${reactCode}
          
          ReactDOM.render(
            <App />,
            document.getElementById('root')
          );
        } catch (error) {
          ReactDOM.render(
            <div className="error">
              <strong>Error:</strong>
              <pre>{error.toString()}</pre>
            </div>,
            document.getElementById('root')
          );
          
          // Send error to parent window
          window.parent.postMessage({
            type: 'COMPILE_ERROR',
            error: error.toString()
          }, '*');
        }
      </script>
    </body>
    </html>
  `;
};

const ReactCodeCompiler: React.FC = () => {
  const [code, setCode] = useState<string>(DEFAULT_CODE);
  const [displayCode, setDisplayCode] = useState<string>(DEFAULT_CODE);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("counter");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [autoCompile, setAutoCompile] = useState<boolean>(true);
  const { toast } = useToast();

  // Handle window messages from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'COMPILE_ERROR') {
        setError(event.data.error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Update iframe content when displayCode changes or on manual compile
  useEffect(() => {
    if (!iframeRef.current) return;
    
    try {
      setError(null);
      const htmlContent = generateHTML(displayCode);
      
      // Write to the iframe
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
      }
    } catch (err) {
      console.error("Failed to update iframe:", err);
      setError(err instanceof Error ? err.toString() : String(err));
      
      toast({
        title: "Compilation Error",
        description: "There was an error compiling your code.",
        variant: "destructive",
      });
    }
  }, [displayCode, toast]);

  // Handle code changes
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    if (autoCompile) {
      setDisplayCode(e.target.value);
    }
  };

  // Manually compile code
  const handleCompile = () => {
    setDisplayCode(code);
    toast({
      title: "Code Compiled",
      description: "Your code has been compiled and is now running in the preview.",
    });
  };

  // Handle template changes
  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
    setCode(TEMPLATES[template as keyof typeof TEMPLATES]);
    if (autoCompile) {
      setDisplayCode(TEMPLATES[template as keyof typeof TEMPLATES]);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 py-6 gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">React Code Compiler</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setAutoCompile(!autoCompile);
              toast({
                title: autoCompile ? "Auto-Compile Disabled" : "Auto-Compile Enabled",
                description: autoCompile 
                  ? "You'll need to manually compile your code now." 
                  : "Your code will automatically compile as you type.",
              });
            }}
          >
            {autoCompile ? "Disable Auto-Compile" : "Enable Auto-Compile"}
          </Button>
          {!autoCompile && (
            <Button size="sm" onClick={handleCompile}>
              Compile and Run
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Code Editor Side */}
        <Card className="w-full lg:w-1/2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Code Editor</CardTitle>
              <Tabs
                defaultValue="counter" 
                value={selectedTemplate}
                onValueChange={handleTemplateChange}
                className="w-fit"
              >
                <TabsList>
                  <TabsTrigger value="counter">Counter</TabsTrigger>
                  <TabsTrigger value="todoList">Todo List</TabsTrigger>
                  <TabsTrigger value="fetchData">Fetch Data</TabsTrigger>
                  <TabsTrigger value="reactEmail">React Email</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-[500px] p-4 font-mono text-sm rounded-md border bg-editor-bg text-editor-text focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={code}
              onChange={handleCodeChange}
              spellCheck="false"
            />
          </CardContent>
        </Card>
        
        {/* Preview Side */}
        <Card className="w-full lg:w-1/2">
          <CardHeader className="pb-2">
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md h-[500px] bg-white overflow-hidden">
              {error ? (
                <div className="text-red-500 p-4 bg-red-50 rounded h-full overflow-auto">
                  <strong>Error:</strong>
                  <pre className="mt-2 whitespace-pre-wrap text-sm">{error}</pre>
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  title="React Preview"
                  className="w-full h-full border-none"
                  sandbox="allow-scripts allow-same-origin"
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReactCodeCompiler;

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formattedText } from "@/services/utils";
import type { Message } from "ai/react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";

const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <ReactMarkdown key={`${i}-${line}`} className="prose  max-w-none">
      {line}
    </ReactMarkdown>
  ));

interface ChatLineProps extends Partial<Message> {
  sources: string[];
}

export function ChatLine({
  role = "assistant",
  content,
  sources,
}: ChatLineProps) {
  if (!content) {
    return null;
  }
  const formattedMessage = convertNewLines(content);

  return (
    <div>
      <Card className="mb-2">
        <CardHeader>
          <CardTitle
            className={
              role !== "assistant"
                ? "text-amber-500 dark:text-amber-200"
                : "text-blue-500 dark:text-blue-200"
            }
          >
            {role === "assistant" ? "Research Assistant" : "You"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-base">
          <Balancer>{formattedMessage}</Balancer>
        </CardContent>
        <CardFooter>
          <CardDescription className="w-full">
            {sources?.length ? (
              <Accordion type="single" collapsible className="w-full">
                {sources.map((source, index) => (
                  <AccordionItem value={`source-${index}`} key={index + source}>
                    <AccordionTrigger>{`Source ${index + 1}`}</AccordionTrigger>
                    <AccordionContent>
                      <ReactMarkdown linkTarget="_blank">
                        {formattedText(source)}
                      </ReactMarkdown>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <></>
            )}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

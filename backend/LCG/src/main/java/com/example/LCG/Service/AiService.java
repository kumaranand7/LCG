package com.example.LCG.Service;

import com.example.LCG.dto.AiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;
@Service
public class AiService {

    @Value("${groq.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public AiResponse extractFromSummary(String summary) throws Exception {

        String prompt = """
            Extract information from this summary and return ONLY a JSON object like this:
            {
              "name": "extracted name or empty string",
              "role": "professional role title",
              "skills": "Skill1 | Skill2 | Skill3"
            }
            No explanation, just JSON.
            Summary: """ + summary;

        String url = "https://api.groq.com/openai/v1/chat/completions";

        Map<String, Object> body = Map.of(
                "model", "llama-3.3-70b-versatile",
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

        System.out.println("Groq response: " + response.getBody());

        // Extract text from Groq response
        List choices = (List) response.getBody().get("choices");
        Map message = (Map) ((Map) choices.get(0)).get("message");
        String text = (String) message.get("content");

        System.out.println("Extracted text: " + text);

        String cleaned = text.replaceAll("```json|```", "").trim();
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(cleaned, AiResponse.class);
    }
}
package com.skillshare.SkillShareApp.utils;

import com.skillshare.SkillShareApp.dto.MeetDetails;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Converter(autoApply = true)
public class MeetingDetailsConverter implements AttributeConverter<MeetDetails, String> {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(MeetDetails meetingDetails) {
        try {
            return meetingDetails == null ? null : objectMapper.writeValueAsString(meetingDetails);
        } catch (Exception e) {
            throw new RuntimeException("Error converting MeetingDetailsDTO to JSON", e);
        }
    }

    @Override
    public MeetDetails convertToEntityAttribute(String json) {
        try {
            return json == null ? null : objectMapper.readValue(json, MeetDetails.class);
        } catch (IOException e) {
            throw new RuntimeException("Error converting JSON to MeetingDetailsDTO", e);
        }
    }
}


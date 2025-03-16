package com.skillshare.SkillShareApp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.Base64;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class MentorSearchResponseDTO extends ResponseDTO {
    private String mentorName;
    private String mentorRating;
    private String mentorImageBase64;
    private String mentorBio;
    private List<String> mentorProficiencies;
    private Long mentorId;

    public static String convertByteArrayToBase64(byte[] imageInBytes) {
        if (imageInBytes != null && imageInBytes.length > 0) {
            return "data:image/png;base64," + Base64.getEncoder().encodeToString(imageInBytes);
        }
        return null;
    }

}

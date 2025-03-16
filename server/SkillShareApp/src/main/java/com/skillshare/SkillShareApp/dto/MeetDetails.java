package com.skillshare.SkillShareApp.dto;

import com.skillshare.SkillShareApp.enums.Mode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.util.Pair;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MeetDetails {
    private Mode mode;
    private String onlineMeetUrl;
    private String onlineMeetPassword;
    private String offlineMeetLocation;
    private String offlineMeetKey;
    private Pair<Float, Float> offlineMeetCoords;
}

package com.archelo.wine.data;



import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Table(name = "wine_review")
public class Wine {
    @Id @GeneratedValue
    Long id;
    String country;
    String description;
    String designation;
    Integer points;
    BigDecimal price;
    String province;
    String region_1;
    String region_2;
    String taster_name;
    String taster_twitter_handle;
    String title;
    String variety;
    String winery;
}

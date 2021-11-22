package com.wso2.finance.open.banking.mcr.endpoint.model;


import io.swagger.annotations.ApiModel;

import io.swagger.annotations.ApiModelProperty;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * defines error object for application infromation api
 **/
@ApiModel(description="defines error object for application infromation api")
public class SSAInfoErrorDTO {

    @ApiModelProperty(value = "HTTP error code as string")
    /**
     * HTTP error code as string
     **/
    private String status;

    @ApiModelProperty(value = "error summmary")
    /**
     * error summmary
     **/
    private String title;

    @ApiModelProperty(value = "human readable error description")
    /**
     * human readable error description
     **/
    private String description;
    /**
     * HTTP error code as string
     * @return status
     **/
    @JsonProperty("status")
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public SSAInfoErrorDTO status(String status) {
        this.status = status;
        return this;
    }

    /**
     * error summmary
     * @return title
     **/
    @JsonProperty("title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public SSAInfoErrorDTO title(String title) {
        this.title = title;
        return this;
    }

    /**
     * human readable error description
     * @return description
     **/
    @JsonProperty("description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SSAInfoErrorDTO description(String description) {
        this.description = description;
        return this;
    }


    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("class ApplicationInfoErrorDTO {\n");

        sb.append("    status: ").append(toIndentedString(status)).append("\n");
        sb.append("    title: ").append(toIndentedString(title)).append("\n");
        sb.append("    description: ").append(toIndentedString(description)).append("\n");
        sb.append("}");
        return sb.toString();
    }

    /**
     * Convert the given object to string with each line indented by 4 spaces
     * (except the first line).
     */
    private static String toIndentedString(java.lang.Object o) {
        if (o == null) {
            return "null";
        }
        return o.toString().replace("\n", "\n    ");
    }
}


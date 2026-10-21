create or replace package body "PKG_BPMN" as

   
    
    /*==================================================*/
    -- functions
    /*==================================================*/
        
    function get_objects(p_xml in clob)
    return tbl_objs pipelined
    is
        v_xml xmltype;
    
    begin
        if p_xml is null then
            raise_application_error(-20001, 'BPMN XML is NULL');
        end if;

        v_xml := xmltype(p_xml);


        for r in (
            select
                x.id,
                x.name,                
                x.element
            from xmltable('//*'             
                passing v_xml
                columns
                    id   varchar2(100)  path '@id',
                    name varchar2(1000) path '@name',
                    element varchar2(100)  path 'local-name()'
            ) x
           -- where x.id is not null
        )
        loop
           pipe row ( rec_obj(r.id, r.name, null, r.element) );
        end loop;


     
    end get_objects;

    /*==================================================*/
    function get_activities(p_xml in clob)
    return tbl_objs pipelined
    is
        v_xml xmltype;
    
    begin
       
        v_xml := xmltype(p_xml);


        for r in (
            -- select
            --     x.id,
            --     x.name,
            --     x.type
            -- from xmltable(
            --     '//*[local-name() = "task"
            --        or local-name() = "userTask"
            --        or local-name() = "serviceTask"
            --        or local-name() = "scriptTask"
            --        or local-name() = "manualTask"
            --        or local-name() = "businessRuleTask"
            --        or local-name() = "sendTask"
            --        or local-name() = "receiveTask"
            --        or local-name() = "callActivity"
            --        or local-name() = "subProcess"
            --        or local-name() = "transaction"
            --        or local-name() = "adHocSubProcess"]'
            --     passing v_xml
            --     columns
            --         id   varchar2(100)  path '@id',
            --         name varchar2(1000) path '@name',
            --         type varchar2(100)  path 'local-name()'
            -- ) x

            with symbols as (
                SELECT 'Task' AS name, 'task' AS xml_name FROM dual
                UNION ALL SELECT 'User Task', 'userTask' FROM dual
                UNION ALL SELECT 'Manual Task', 'manualTask' FROM dual
                UNION ALL SELECT 'Service Task', 'serviceTask' FROM dual
                UNION ALL SELECT 'Script Task', 'scriptTask' FROM dual
                UNION ALL SELECT 'Business Rule Task', 'businessRuleTask' FROM dual
                UNION ALL SELECT 'Send Task', 'sendTask' FROM dual
                UNION ALL SELECT 'Receive Task', 'receiveTask' FROM dual
                UNION ALL SELECT 'Sub-Process', 'subProcess' FROM dual
                UNION ALL SELECT 'Call Activity', 'callActivity' FROM dual
                UNION ALL SELECT 'Transaction', 'transaction' FROM dual
                UNION ALL SELECT 'Ad-Hoc Sub-Process', 'adHocSubProcess' FROM dual
            )
            SELECT x.id, 
                   x.name, 
                   s.name as bpmn_name, 
                   x.xml_name
            FROM TABLE (get_objects(p_xml)) x
            inner join symbols s
               on x.xml_name = s.xml_name          
            
        )
        loop
           pipe row( rec_obj(r.id, r.name, r.bpmn_name, r.xml_name));
        end loop;
     
    end get_activities;

    /*==================================================*/    
    function get_flows(p_xml in clob) 
    return tbl_flows pipelined
    is
        v_xml xmltype;
    begin
        if p_xml is null then
            raise_application_error(-20001, 'BPMN XML is NULL');
        end if;

        v_xml := xmltype(p_xml);

        for r in (
            select
                x.id,
                x.name,
                x.source_id,
                x.target_id,
                lower(x.type) as type
            from xmltable(
                '//*[local-name() = "sequenceFlow"
                 or local-name() = "messageFlow"]'
                passing v_xml
                columns
                    id        varchar2(100)  path '@id',
                    name      varchar2(1000) path '@name',
                    source_id varchar2(100)  path '@sourceRef',
                    target_id varchar2(100)  path '@targetRef',
                    type      varchar2(100)  path 'local-name(.)'
            ) x
            where x.id is not null
        )
        loop
            pipe row(rec_flow(r.id, r.name, r.source_id, r.target_id, r.type));
        end loop;

        return;
    end get_flows;

    /*==================================================*/

end "PKG_BPMN";
/
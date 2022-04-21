# Java Servlet Based HTTP Backend using Tomcat Server

## Referenced Libraries

- MySQL Connector for JDBC Connection
- GSON for serialzation and de-serialization of response / request object.

**Endpoints**

<table border="1px solid">
<th>Endpoint</th>
<th>Type</th>
<th>Details</th>

<tr>
<td>/Fetch</td>
<td>GET</td>
<td>for fetching data from database; supports pagination , query by customerId</td>
</tr>

<tr>
<td>/Add</td>
<td>POST</td>
<td>for adding row into database</td>
</tr>

<tr>
<td>/Edit</td>
<td>POST</td>
<td>for updating a row into database</td>
</tr>

<tr>
<td>/Delete</td>
<td>POST</td>
<td>for deleting a row (SOFT Delete)</td>
</tr>

<tr>
<td>/Search</td>
<td>GET</td>
<td>for advance search based on multiple column(s)</td>
</tr>

<tr>
<td>/Analytics</td>
<td>POST</td>
<td>for analytics based on certian parametrs</td>
</tr>

</table>

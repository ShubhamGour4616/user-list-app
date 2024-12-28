const UserTableCell: React.FC<UserTableCellProps> = ({
  children,
  width = "w-auto",
}) => (
  <Table.Cell className={`${width} px-4 py-2 truncate`}>{children}</Table.Cell>
);

// components/UserTable/UserTable.tsx
import { Table } from "@radix-ui/themes";
import { User, UserTableCellProps, UserTableProps } from "../../types/user";

export const UserTable: React.FC<UserTableProps> = ({ users, onRowClick }) => {
  const columns = [
    { key: "name", label: "Full Name", width: "w-[150px]" },
    { key: "username", label: "Username", width: "w-[120px]" },
    { key: "email", label: "Email", width: "w-[200px]" },
    { key: "address.street", label: "Street", width: "w-[150px]" },
    { key: "address.city", label: "City", width: "w-[150px]" },
    { key: "address.zipcode", label: "Zipcode", width: "w-[100px]" },
    { key: "phone", label: "Phone", width: "w-[150px]" },
    { key: "website", label: "Website", width: "w-[150px]" },
  ];

  const getValue = (user: User, key: string) => {
    const parts = key.split(".");
    let value: any = user;
    for (const part of parts) {
      value = value?.[part];
    }
    return value;
  };

  return (
    <Table.Root variant="surface" className="user-table">
      <Table.Header className="bg-gray-50">
        <Table.Row>
          {columns.map(({ label, width }) => (
            <Table.ColumnHeaderCell
              key={label}
              className={`${width} font-semibold text-gray-700 px-4 py-3`}
            >
              {label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {users.map((user) => (
          <Table.Row
            key={user.id}
            onClick={() => onRowClick(user)}
            className="transition-colors hover:bg-gray-50 cursor-pointer"
          >
            {columns.map(({ key, width }) => (
              <UserTableCell key={key} width={width}>
                {key === "website" ? (
                  <a
                    href={`http://${getValue(user, key)}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {getValue(user, key)}
                  </a>
                ) : (
                  getValue(user, key)
                )}
              </UserTableCell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
